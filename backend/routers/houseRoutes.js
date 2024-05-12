import express from "express";
import { createHouse, getHouse, getHouseVisits, getHouses } from "../controllers/HouseController.js";
import uploader from "../utils/fileProcessing.js";
import verifyToken from "../utils/verifyToken.js";

const houseRouter  = express.Router();
houseRouter.post('/create', uploader.array('images', 10), createHouse);
houseRouter.get('/:id', getHouse);
houseRouter.get('/:id/visitrequests', getHouseVisits);
houseRouter.get('/', getHouses);


export default houseRouter