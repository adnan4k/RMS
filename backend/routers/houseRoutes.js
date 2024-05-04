import express from "express";
import { addHouseCalendar, createHouse, getHouse } from "../controllers/HouseController.js";
import uploader from "../utils/fileProcessing.js";
import verifyToken from "../utils/verifyToken.js";
import { craeteVisitorRequest } from "../controllers/VisitorController.js";

const houseRouter  = express.Router();
houseRouter.post('/create', verifyToken('owner'), uploader.array('images', 10), createHouse);
houseRouter.get('/:id', getHouse);
houseRouter.post('/:houseid/calendar', verifyToken('owner'), addHouseCalendar);
houseRouter.get('/:houseid/calendar', verifyToken('user'), craeteVisitorRequest);


export default houseRouter