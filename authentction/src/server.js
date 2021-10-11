const express = require("express");
const connect = require("./config/db");
const app = express();
app.use(express.json());

const { register, login } = require("./controller/auth.controller");
const productController = require("./controller/product.controller");
app.post("/register", register);
app.post("/login", login);

app.use("/products", productController);

const start = async () => {
  await connect();
  app.listen(6712, () => {
    console.log("listening on 6712");
  });
};

module.exports = start;
