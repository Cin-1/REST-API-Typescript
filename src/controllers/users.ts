const User = require("../model/user");
const bcryptjs = require("bcryptjs");
import { Request, Response } from "express";

exports.newUser = async (req: Request, res: Response) => {
  const { password, name, last_name, email, phone, birthday } = req.body;
  try {
    let checkEmail = await User.findOne({ emails: email });
    if (checkEmail) {
      return res.status(400).json({ msg: "User is already registered" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);
    const user = {
      emails: email,
      password: hashPassword,
      name,
      last_name,
      phones: phone,
      birthday,
    };
    const newUser = new User(user);
    await newUser.save();
    res
      .status(200)
      .json({ data: { info: newUser }, msg: "New user registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "Server error" } });
  }
};
exports.getAll = async (req: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    res.status(200).json({ data: { info: allUsers }, msg: "All users" });
  } catch (error) {
    res.status(500).json({ error: { msg: "Server error" } });
  }
};
exports.getActive = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const activeUser = await User.findById(id);
    if (!activeUser) {
      return res.status(404).json({ error: { msg: "User does not exists" } });
    }
    res.status(200).json({ data: { info: activeUser }, msg: "User active" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "Server error" } });
  }
};
exports.updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  let user = req.body;
  const { password } = req.body;
  try {
    let userCheck = await User.findById(id);
    if (!userCheck) {
      return res.status(404).json({ error: { msg: "User does not exists" } });
    }
    const salt = await bcryptjs.genSalt(10);
    if (user.password) user.password = await bcryptjs.hash(password, salt);
    const userUpdated = await User.findByIdAndUpdate(
      id,
      { $set: user },
      { new: true }
    );
    res
      .status(200)
      .json({ data: { info: userUpdated }, msg: ` User succesfuly updated` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "Server error" } });
  }
};

exports.deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let userD = await User.findById(id);
    if (!userD) {
      return res.status(404).json({ error: { msg: "User does not exist" } });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ data: { info: userD }, msg: ` User ${id} Deleted` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: { msg: "Server error" } });
  }
};
