import { Router } from "express";
const emailController = require("../controllers/email");

const emailRoutes = Router();

emailRoutes.patch("/add/:id", emailController.addEmail);
emailRoutes.delete("/delete", emailController.deleteEmail);
emailRoutes.post("/send", emailController.sendEmail);

export default emailRoutes;
