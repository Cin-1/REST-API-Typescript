import { Router, Request, Response } from "express";
const userController = require("../controllers/users");

const userRoutes = Router();

userRoutes.post("/create", userController.newUser);

export default userRoutes;
