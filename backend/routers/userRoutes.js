import express from "express";
import { forgetPassword, login, register, resetPassword } from "../controllers/UserController.js";

const userRouter  = express.Router();
userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/resetpassword/:token', resetPassword);
userRouter.post('/forgetpassword', forgetPassword);


export default userRouter