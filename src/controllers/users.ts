const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
import { Request, Response } from "express";

exports.newUser = async (req: Request, res: Response) => {
  const { email, password, name, last_name, emails, phones, birthday } =
    req.body;
  // let checkEmail = await User.findOne({ email });
  // if (!checkEmail) {
  //   console.log(checkEmail);
  //   return res.status(404).json({ msg: "User is already registered" });
  // }
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(password, salt);
  const user = {
    email,
    password: hashPassword,
    name,
    last_name,
    emails,
    phones,
    birthday,
  };
  const newUser = new User(user);
  await newUser.save();
  delete newUser.password;
  res.send(newUser);
};
exports.getAll = async (req: Request, res: Response) => {
  const allUsers = await User.find();
  res.send(allUsers);
};
exports.getActive = async (req: Request, res: Response) => {
  const { id } = req.params;
  const activeUser = await User.findById(id);
  if (!activeUser) {
    return res.status(404).json({ msg: "User does not exists" });
  }
  res.send(activeUser);
};
exports.updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  let user = req.body;
  const { password } = req.body;
  const salt = await bcryptjs.genSalt(10);
  if (user.password) user.password = await bcryptjs.hash(password, salt);
  console.log(user);
  try {
    let userCheck = await User.findById(id);
    if (!userCheck) {
      return res.status(404).json({ msg: "User does not exists" });
    }
    const userUpdated = await User.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true }
    );
    delete userUpdated.password;
    res.send(userUpdated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let userD = await User.findById(id);
    if (!userD) {
      return res.status(404).json({ msg: "User does not exist" });
    }
    await User.findByIdAndDelete(id);
    res.json({ msg: `${id} Deleted` });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
