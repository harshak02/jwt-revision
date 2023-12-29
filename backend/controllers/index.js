import bcrypt from "bcrypt";
import UserModel from "../models/User";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  const { fullName, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  let existingUser;
  try {
    existingUser = await UserModel.findOneAndDelete({ email });
  } catch (err) {
    console.log(err);
  }

  if (existingUser) {
    return res.status(400).json({
      message: "Existing User!",
    });
  }
  let newUser;
  try {
    newUser = new UserModel({
      fullName,
      password: hashedPassword,
      email,
    });
    await newUser.save();
  } catch (err) {
    console.log(err);
  }

  return res.status(201).json({
    message: "User is created",
    newUser,
  });
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await UserModel.findOne({ email });
  } catch (err) {
    console.log(err);
  }

  if (!existingUser) {
    return res.status(401).json({
      message: "INvalid User Credentials",
    });
  }

  const isEqual = await bcrypt.compare(password, existingUser.password);

  if (!isEqual) {
    return res.status(401).json({
      message: "Wrong Password!",
    });
  }

  const tokenObject = {
    _id: existingUser.id,
    fullName: existingUser.fullName,
    email: existingUser.email,
  };

  const jwtToken = jwt.sign(tokenObject, process.env.SECRET, {
    expiresIn: "4h",
  });

  res.cookie("jwtCookie", jwtToken, {
    maxAge: 600000,
    httpOnly: true,
  });

  return res
    .status(200)
    .json({
      message: "Logged In!",
      jwtToken,
      tokenObject,
    });
};

export const getUsers = async (req, res, next) => {
  let users;
  const id = req.user._id;
  let userName;
  try {
    userName = await UserModel.findById(id);
  } catch (err) {
    console.log(err);
  }

  try {
    users = await UserModel.find({}, { password: 0 });
  } catch (err) {
    console.log(err);
  }

  if (users) {
    return res.status(200).json({
      message: "Success!",
      userRn: userName.fullName,
      users,
    });
  }

  return res.status(401).json({
    message: "Error Occured!",
  });
};

export const logoutUser = (req, res , next) => {

    res.clearCookie('jwtCookie');  
    res.status(200).json({
      message: "Logout successful",
    });
};