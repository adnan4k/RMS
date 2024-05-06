import express from "express";
import { addHouseCalendar, createHouse, getHouse, getHouses } from "../controllers/HouseController.js";
import uploader from "../utils/fileProcessing.js";
import verifyToken from "../utils/verifyToken.js";

const houseRouter  = express.Router();
houseRouter.post('/create', verifyToken('owner'), uploader.array('images', 10), createHouse);
houseRouter.post('/:houseid/calendar', verifyToken('user'), createVisitorRequest);
houseRouter.get('/:id', getHouse);
houseRouter.get('/', getHouses);


export default houseRouter