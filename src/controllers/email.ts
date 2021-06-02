require("dotenv").config();
const User = require("../model/user");
const { emailvalid } = require("../validate");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_KEY);
const { Msg } = require("../helper");
import { Request, Response } from "express";

exports.addEmail = async (req: Request, res: Response) => {
  const { id } = req.params;
  let { email } = req.body;

  try {
    const result = await emailvalid.validate({ email });
    if (result.error)
      return res.status(400).json({ msg: result.error.details[0].message });
    let checkUser = await User.findOne({ emails: email });
    if (checkUser) {
      return res
        .status(400)
        .json({ error: { msg: "Email already registered" } });
    }
    const emailUpdated = await User.findByIdAndUpdate(
      id,
      { $push: { emails: email } },
      { new: true }
    );
    const msg = new Msg(
      "cinthiapardos@gmail.com",
      process.env.EMAIL,
      "Email updated",
      "Your email has been added successfully "
    );
    console.log(msg);
    sgMail.send(msg, function (err, result) {
      if (err) {
        console.log("Email Not Sent Error Occured");
      } else {
        console.log("Email was Sent");
      }
    });
    res
      .status(200)
      .json({ data: { info: emailUpdated }, msg: "Email succesfuly added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "Server error" } });
  }
};

exports.deleteEmail = async (req: Request, res: Response) => {
  let { email } = req.body;
  try {
    let checkUser = await User.findOne({ emails: email });
    if (!checkUser) {
      return res.status(400).json({ error: { msg: "Email does not exists" } });
    }
    const id = checkUser.id;
    console.log(id);
    const emailDeleted = await User.updateOne(
      { _id: id },
      { $pull: { emails: email } }
    );
    const msg = new Msg(
      "cinthiapardos@gmail.com",
      process.env.EMAIL,
      "Email deleted",
      "Your email has been deleted successfully "
    );
    console.log(msg);
    sgMail.send(msg, function (err, result) {
      if (err) {
        console.log("Email Not Sent Error Occured");
      } else {
        console.log("Email was Sent");
      }
    });
    res
      .status(200)
      .json({ data: { info: emailDeleted }, msg: "Email succesfuly deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "Server error" } });
  }
};
exports.sendEmail = async (req: Request, res: Response) => {
  let { to, text, subject } = req.body;
  console.log(to, text, subject);
  try {
    const msg = new Msg(to, process.env.EMAIL, subject, text);
    sgMail.send(msg, function (err, result) {
      if (err) {
        res
          .status(400)
          .json({ error: { msg: "Email Not Sent Error Occured" } });
      } else {
        res.status(200).json({ msg: "Email was Sent" });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "Server error" } });
  }
};
