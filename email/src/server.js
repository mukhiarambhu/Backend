const express = require("express");
const connect = require("./config/db");
const app = express();
app.use(express.json());

const userController = require("./controller/user.controller");

app.use("/users", userController);

const start = async () => {
  await connect();
  app.listen(4444, () => {
    console.log("listening on port 4444");
  });
};

module.exports = start;
