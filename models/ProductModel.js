const { Schema, model, models } = require("mongoose");

// Step 1: Define the interface for the document
const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    bulletPoints: { type: [String] },
    thumbnail: {
      url: { type: String, required: true },
      id: { type: String, required: true },
    },
    images: [
      {
        url: { type: String, required: true },
        id: { type: String, required: true },
      },
    ],
    price: {
      base: { type: Number, required: true },
      discounted: { type: Number, required: true },
    },
    quantity: { type: Number, required: true },
    rating: Number,
  },
  { timestamps: true }
);

// Step 3: Define the virtual property for "sale"
ProductSchema.virtual("sale").get(function () {
  return Math.round(
    ((this.price.base - this.price.discounted) / this.price.base) * 100
  );
});

// Step 4: Check if the model already exists before exporting
const ProductModel = models.Product || model("Product", ProductSchema);

export default ProductModel;
