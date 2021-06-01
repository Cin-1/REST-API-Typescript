import { Router } from "express";
const emailController = require("../controllers/email");

const emailRoutes = Router();

emailRoutes.put("/add/:id", emailController.addEmail);

export default emailRoutes;
