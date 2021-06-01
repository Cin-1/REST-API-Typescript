import { Router } from "express";
const userController = require("../controllers/users");

const userRoutes = Router();

userRoutes.post("/create", userController.newUser);
userRoutes.get("/all", userController.getAll);
userRoutes.get("/active/:id", userController.getActive);
userRoutes.delete("/delete/:id", userController.deleteUser);
userRoutes.put("/update/:id", userController.updateUser);

export default userRoutes;
