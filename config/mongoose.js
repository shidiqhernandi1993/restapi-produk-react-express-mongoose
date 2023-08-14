const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const url = "mongodb://admin:root@127.0.0.1:27017/produkshidiq?authSource=admin";

const connectMongoose = () => {
  return mongoose.connect(url);
};

module.exports = connectMongoose;
