const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

//we are directly importing register and login not using router beacuse website has/register not /.../register

const register = async (req, res) => {
  let user;
  try {
    //step1 we check if user with same email exist if yes we throw an error that mail already exist
    user = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).send({ message: "user already exist" });

    //step2- if not exist then we will create user with email and password but before saving pw we need to hash it but we will hash it it in model before creating a model hashing is business level logic

    user = await User.create(req.body);

    //step3- we will create a token and send it to front end - will use jsonwebtoken package for this , what it does is if we give an object it will encrypt and give token and we give token it will encrypt and give back object.
    const token = newToken(user);

    //step4- return the token to frontend
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: "sorry please try again" });
  }
};

const login = async (req, res) => {
  try {
    //step1-first we will check if user with same email exist if not we will throw erro
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: "user donot exist" });

    //step2- if it exist we will match the password ,if not match throw an error -we have to create a method on user model beacause we have  a password on user model
    let match = user.checkPassword(req.body.password);
    if (!match)
      return res.status(500).send({ message: "sorry please try again" });
    //step3-we will create a token

    const token = newToken(user);
    //step4- return the token to frontend
    return res.status(200).send({ user, token });
  } catch (err) {
    return res.status(500).send({ message: "sorry please try again" });
  }
};

module.exports = { register, login };
