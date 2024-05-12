import express from "express";
import { editProfile, forgetPassword, getUser, login, logout, refreshToken, register, resetPassword } from "../controllers/UserController.js";
import verifyToken from "../utils/verifyToken.js";
import { createVisitorRequest, getRequests } from "../controllers/VisitorController.js";

const userRouter  = express.Router();
userRouter.post('/register',register);
userRouter.post('/login',login);
router.post('/refresh', refreshToken);
router.post('/:username/logout', verifyToken('user', 'owner', 'admin', 'tenant'), logout);
userRouter.post('/resetpassword/:token', resetPassword);
userRouter.post('/forgetpassword', forgetPassword);
userRouter.put('/:username', verifyToken('user'), editProfile);
userRouter.get('/:username', getUser);
userRouter.get('/schedules', verifyToken('user'), getRequests);
userRouter.post('/:houseid', verifyToken('user'), createVisitorRequest);


export default userRouter