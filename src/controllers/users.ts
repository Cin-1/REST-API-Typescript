const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
import express, { Request, Response } from "express";

exports.newUser = async (req: Request, res: Response) => {
  const { name, last_name, emails, phones, birthday, password } = req.body;
  const newUser = new User({ name, last_name });
  await newUser.save();
  res.json({ msg: `${newUser} saved` });
};
exports.getAll = async (req: Request, res: Response) => {
  const allUsers = await User.find();
  console.log(allUsers);
  res.send(allUsers);
};
