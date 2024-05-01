import express from "express";
import { createHouse } from "../controllers/houseController.js";
import uploader from "../utils/fileProcessing.js";
import verifyToken from "../utils/verifyToken.js";

const houseRouter  = express.Router();
houseRouter.post('/create', verifyToken('owner'), uploader.array('images', 10), createHouse);


export default houseRouter