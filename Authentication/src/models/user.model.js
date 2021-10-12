const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8, maxlength: 20 },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
);
//before saving and updating user do something i.e hash the password and hasing will be done on two occasion i.e on creating and updating  will use bcryptjs for hashing
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next(); //if password is not modified do nothing go next

  const hash = bcryptjs.hashSync(this.password, 8);
  this.password = hash;
  return next();
});

//to match password durin login creating a method

userSchema.methods.checkPassword = function (password) {
  const match = bcryptjs.compareSync(password, this.password);
  return match;
};

const User = mongoose.model("practice", userSchema);

module.exports = User;
