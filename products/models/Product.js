const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
    },
    qtyStock: {
      type: Number,
    },
    description: {
      type: String,
    },
    brand: {
      type: String,
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("Product", productSchema);