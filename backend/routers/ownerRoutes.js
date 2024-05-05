import express from "express";
import { addOwner, getOwner } from "../controllers/OwnerController.js";
import verifyToken from "../utils/verifyToken.js";
import uploader from "../utils/fileProcessing.js"
import { getVisitRequests } from "../controllers/VisitorController.js";
import { addHouseCalendar } from "../controllers/HouseController.js";

const ownerRouter  = express.Router();

ownerRouter.post('/createowner', verifyToken("user"), uploader.single('national_id'), addOwner);
ownerRouter.get('/', verifyToken('owner'), getOwner);
ownerRouter.get('/:houseid/requests', verifyToken('owner'), getVisitRequests);
ownerRouter.post('/:houseid/calendar', verifyToken('owner'), addHouseCalendar);

export default ownerRouter;
