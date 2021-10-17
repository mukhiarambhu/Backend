const express = require("express");
const upload = require("../middleware/upload");
const Product = require("../model/product.model");
const path = require("path");
const router = express.Router();

router.post("/single", upload.single("productImages"), async (req, res) => {
  //middleware should add single,multiple and name should be exactly same as paassing in fieldname
  const product = await Product.create({
    title: req.body.title,
    price: req.body.price,
    image_urls: req.file.path, //as it is file to be uploaded to be send as file from postman
  });
  return res.status(200).send({ product });
});

router.post("/multiple", upload.any("productImages"), async (req, res) => {
  //middleware should add any as we have to add multiple images, and name should be exactly same as paassing in fieldname
  const filePaths = req.files.map((file) => file.path);
  const product = await Product.create({
    title: req.body.title,
    price: req.body.price,
    image_urls: filePaths, //as it is file to be uploaded to be send as file from postman
  });
  return res.status(200).send({ product });
});
module.exports = router;
