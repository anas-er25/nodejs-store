const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    quantity: {
      type: Number,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
