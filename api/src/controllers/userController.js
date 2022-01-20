require("localenv");

const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const UserModel = require("../models/user");

// GET THE CURRENT USER (ME)
exports.getCurrentuser = async (_, { id }, { user }) => {
  // check auth
  if (!user) throw new Error("You are not authenticated");

  // find me
  try {
    const result = await UserModel.findById(id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// GET A SPECIFIC USER
exports.getSpecificuser = async (_, { id }, { user }) => {
  // check auth
  if (!user) throw new Error("You are not authenticated");

  // find the user by args
  try {
    const result = await UserModel.findById(id);
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

// POST - CREATE USER (eg - signin function)
exports.createUser = async (_, { username, email, password }) => {
  try {
    // TODO: check if email already saved

    // save data (including encrypted pswd)
    const user = await UserModel.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
    });

    // token creation
    const token = jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1y" }
    );

    return {
      token,
      user,
      message: "Authentication succesfull",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.loginUser = async (_, { email, password }) => {
  try {
    // find user by email (where email === email)
    const user = await UserModel.findOne({ email });

    // stop if no user
    if (!user) {
      throw new Error("No user registrated with that email");
    }

    // then check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Incorrect password");
    }

    // JWT creation
    const token = jsonwebtoken.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      user,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
