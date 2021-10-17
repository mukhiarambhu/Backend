const express = require("express");
const connect = require("./config/db");
const app = express();
app.use(express.json());

const productController = require("./controller/product.controller");
app.use("/products", productController);

const start = async () => {
  await connect();
  app.listen(7245, () => {
    console.log("listening on port 7245");
  });
};

module.exports = start;
