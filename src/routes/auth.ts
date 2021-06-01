import { Router } from "express";
const authController = require("../controllers/auth");
const auth = require("../middleware/auth");

const authRoutes = Router();

authRoutes.post("/login", authController.authUser);

export default authRoutes;
