import express from "express";
import { createHouse, getHouse } from "../controllers/HouseController.js";
import uploader from "../utils/fileProcessing.js";
import verifyToken from "../utils/verifyToken.js";

const houseRouter  = express.Router();
houseRouter.post('/create', verifyToken('owner'), uploader.array('images', 10), createHouse);
houseRouter.get('/:id', getHouse);


export default houseRouter