const express = require("express");
const connect = require("./config/db");
const passport = require("./config/passport");
const app = express();
app.use(express.json());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

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
