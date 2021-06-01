const User = require("../model/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { Request, Response } from "express";

exports.authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let checkUser = await User.findOne({ emails: email });
    if (!checkUser) {
      return res.status(400).json({ error: { msg: "User does not exists" } });
    }
    const passDB = checkUser.password;
    const checkPass = await bcryptjs.compare(password, passDB);
    console.log(checkPass);
    if (!checkPass) {
      return res.status(400).json({ error: { msg: "Wrong password" } });
    }
    const payload = {
      user: {
        id: checkUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET,
      {
        expiresIn: 3600000,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token: token });
      }
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: { msg: "Server error" } });
  }
};
