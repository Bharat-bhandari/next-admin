import connectDB from "@/config/database";
import cloudinary from "@/config/config";
import ProductModel from "@/models/ProductModel";

export const POST = async (request) => {
  try {
    await connectDB();

    const formData = await request.formData();

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

    // Retrieve Images from formData
    const images = [];

    formData.forEach((value, key) => {
      if (key.startsWith("images[")) {
        images.push(value);
      }
    });

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
      productData.images = uploadedImages.map((image) => ({
        url: image.secure_url,
        id: image.public_id,
      }));
    }

    // Upload thumbnail to cloudinary
    const thumbnailImage = formData.get("thumbnail");

    if (thumbnailImage) {
      const imageBuffer = await thumbnailImage.arrayBuffer();
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

      // Set the uploaded image URL as the thumbnail
      productData.thumbnail = {
        url: result.secure_url,
        id: result.public_id,
      };
    }

    // Retrieve bullet points from formData
    formData.forEach((value, key) => {
      if (key.startsWith("bulletPoints[")) {
        productData.bulletPoints.push(value);
      }
    });

    // Create a new product using ProductModel
    const newProduct = await ProductModel.create(productData);

    // console.log(newProduct);

    return new Response(JSON.stringify({ message: "Success" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response("Failed to add product", { status: 500 });
  }
};
