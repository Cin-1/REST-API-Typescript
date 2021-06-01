import { Router } from "express";
const emailController = require("../controllers/email");

const emailRoutes = Router();

emailRoutes.put("/add/:id", emailController.addEmail);
emailRoutes.delete("/delete", emailController.deleteEmail);

export default emailRoutes;
