import express from "express"
import { paymentInitializtion } from "../controllers/ChapaController.js";

const paymentRouter  = express.Router();
 
paymentRouter.get('/payment-initialization',paymentInitializtion)

export  default paymentRouter
