const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "field nama harus ada"],
    minLength: 3,
    maxLength: 50,
  },
  price: {
    type: Number,
    required: true,
    minLength: 1000,
    maxLength: 10000000000,
  },
  stock: {
    type: Number,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
