const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
import express, { Request, Response } from "express";

exports.newUser = async (req: Request, res: Response) => {
  const { name, last_name, emails, phones, birthday, password } = req.body;
  const newUser = new User(req.body);
  const salt = await bcryptjs.genSalt(10);
  newUser.password = await bcryptjs.hash(password, salt);

  await newUser.save();
  res.json({ msg: `${newUser} saved` });
};
exports.getAll = async (req: Request, res: Response) => {
  const allUsers = await User.find();
  console.log(allUsers);
  res.send(allUsers);
};
exports.deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    let userD = await User.findById(id);
    if (!userD) {
      return res.status(404).json({ msg: "Username does not exist" });
    }
    await User.findByIdAndDelete(id);
    res.json({ msg: `${id} Deleted` });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};
