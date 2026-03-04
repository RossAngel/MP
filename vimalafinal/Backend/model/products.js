const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  Pname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Disc: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;