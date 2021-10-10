const express = require("express");

//import connect from config
const connect = require("./config/db");

//import user controller from controller
const userController = require("./controller/user.controller");
const app = express();
app.use(express.json());
app.use("/users", userController);
const start = async () => {
  await connect();

  app.listen(5634, () => {
    console.log("listening on port 5634");
  });
};

//export start to index.js

module.exports = start;
