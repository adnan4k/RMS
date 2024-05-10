import express from "express";
import { addOwner, editProfile, getOwner } from "../controllers/OwnerController.js";
import verifyToken from "../utils/verifyToken.js";
import uploader from "../utils/fileProcessing.js"
import { getVisitRequests } from "../controllers/VisitorController.js";
import { addHouseCalendar, editHouseImages, editHouseInfo } from "../controllers/HouseController.js";
import { addTenant, deleteTenant } from "../controllers/TenantController.js";
import { getMaintenanceRequest } from "../controllers/MaintainanceRequestController.js";

const ownerRouter  = express.Router();

ownerRouter.post('/', verifyToken("user"), uploader.single('national_id'), addOwner);
ownerRouter.get('/:username', getOwner);
ownerRouter.put('/', verifyToken('owner'), uploader.single('national_id'), editProfile);
ownerRouter.post('/:houseid', verifyToken('owner'), uploader.fields([{name:'national_id', maxCount: 1, minCount: 1}, {name:'contract_photo', maxCount: 1, minCount: 1}]), addTenant);
ownerRouter.put('/:houseid/images', verifyToken('owner'), uploader.array('images', 10), editHouseImages);
ownerRouter.delete('/:houseid/tenant', verifyToken('owner'), deleteTenant)
ownerRouter.put('/:houseid',verifyToken('owner'), editHouseInfo);
ownerRouter.get('/maintenance',verifyToken('owner'),getMaintenanceRequest);
ownerRouter.get('/:houseid/requests', verifyToken('owner'), getVisitRequests);
ownerRouter.post('/:houseid/calendar', verifyToken('owner'), addHouseCalendar);

export default ownerRouter;
