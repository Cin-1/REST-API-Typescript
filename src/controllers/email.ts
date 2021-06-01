const User = require("../model/user");
const { emailvalid } = require("../validate");
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
    res
      .status(200)
      .json({ data: { info: emailUpdated }, msg: "Email succesfuly added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: { msg: "Server error" } });
  }
};
