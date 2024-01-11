import express from "express";
import UserService from "../services/user.services";
const userController = express.Router();
const userService = new UserService();
userController.get("/user", userService.getUser);
userController.post("/user", userService.postUser);
userController.delete("/user/:id", userService.deleteUser);
export default userController;
