import cloudinary from "@/config/config";
import connectDB from "@/config/database";
import ProductModel from "@/models/ProductModel";

//PUT /api/products/:id

export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;
    const formData = await request.formData();

    // Get property to update

    const existingProduct = await ProductModel.findById(id);

    // console.log(existingProduct);

    if (!existingProduct) {
      return new Response("Product does not exist ", { status: 404 });
    }

    // Create productData Object for database

    const productData = {
      title: formData.get("title"),
      description: formData.get("description"),
      bulletPoints: [],
      images: [],
      price: {
        base: parseFloat(formData.get("mrp")),
        discounted: parseFloat(formData.get("salePrice")),
      },
      quantity: parseInt(formData.get("quantity")),
      rating: null, // Initialize rating as null, if not provided
    };

    // Retrieve bullet points from formData
    formData.forEach((value, key) => {
      if (key.startsWith("bulletPoints[")) {
        productData.bulletPoints.push(value);
      }
    });

    // Retrieve Images from formData
    const images = [];

    formData.forEach((value, key) => {
      if (key.startsWith("images[")) {
        images.push(value);
      }
    });

    if (images.length > 0) {
      const imageUploadPromises = [];

      for (const image of images) {
        const imageBuffer = await image.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);

        // Convert the image data to base64
        const imageBase64 = imageData.toString("base64");

        // Make request to upload to Cloudinary
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          {
            folder: "ChocolateWeb",
          }
        );

        imageUploadPromises.push(result);

        // Wait for all images to upload
        const uploadedImages = await Promise.all(imageUploadPromises);

        // Add uploaded images to the productData Object
        const newImages = uploadedImages.map((image) => ({
          url: image.secure_url,
          id: image.public_id,
        }));

        productData.images = existingProduct.images.concat(newImages);
      }
    } else {
      productData.images = existingProduct.images;
    }

    // Check if there's a new thumbnail to update
    const newThumbnail = formData.get("thumbnail");
    if (newThumbnail) {
      const thumbnailBuffer = await newThumbnail.arrayBuffer();
      const thumbnailArray = Array.from(new Uint8Array(thumbnailBuffer));
      const thumbnailData = Buffer.from(thumbnailArray);

      // Convert the thumbnail data to base64
      const thumbnailBase64 = thumbnailData.toString("base64");

      // Make request to upload thumbnail to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${thumbnailBase64}`,
        {
          folder: "ChocolateWeb",
        }
      );

      // Update thumbnail object with the new thumbnail
      productData.thumbnail = {
        url: result.secure_url,
        id: result.public_id,
      };
    }

    // Update product in database

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      productData
    );

    return new Response(JSON.stringify(updatedProduct), {
      status: 200,
    });
  } catch (error) {}
};
