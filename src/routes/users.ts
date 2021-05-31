import { Router } from "express";
const userController = require("../controllers/users");

const userRoutes = Router();

userRoutes.post("/create", userController.newUser);
userRoutes.get("/all", userController.getAll);
userRoutes.delete("/delete/:id", userController.deleteUser);

export default userRoutes;
