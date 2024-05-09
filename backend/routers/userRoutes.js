import express from "express";
import { editProfile, forgetPassword, getUser, login, register, resetPassword } from "../controllers/UserController.js";
import verifyToken from "../utils/verifyToken.js";
import { createVisitorRequest, getRequests } from "../controllers/VisitorController.js";

const userRouter  = express.Router();
userRouter.post('/register',register);
userRouter.post('/login',login);
userRouter.post('/resetpassword/:token', resetPassword);
userRouter.post('/forgetpassword', forgetPassword);
userRouter.put('/:username', verifyToken('user'), editProfile);
userRouter.put('/:username', getUser);
userRouter.get('/schedules', verifyToken('user'), getRequests);
userRouter.post('/:houseid', verifyToken('user'), createVisitorRequest);


export default userRouter