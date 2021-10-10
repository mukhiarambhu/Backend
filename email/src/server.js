const express = require("express");
const app = express();
app.use(express.json());

const emailController = require("../controller/email.controller");

app.use("/emails", emailController);

const start = () => {
  app.listen(5699, () => {
    console.log("listening on port 5699");
  });
};

module.exports = start;
//// we cannot read .env file to read we will install a pacakge dotenv
