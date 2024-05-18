import express from "express";
import { addOwner, currentTenant, editProfile, getOwner, occupancyHistory } from "../controllers/OwnerController.js";
import verifyToken from "../utils/verifyToken.js";
import uploader from "../utils/fileProcessing.js"
import { getVisitRequests } from "../controllers/VisitorController.js";
import { addHouseCalendar, editHouseImages, editHouseInfo } from "../controllers/HouseController.js";
import { addTenant, deleteTenant } from "../controllers/TenantController.js";
import { changeStatus, getMaintenanceRequest } from "../controllers/MaintainanceRequestController.js";
import { paymentStats } from "../controllers/PaymentController.js";

const ownerRouter  = express.Router();

ownerRouter.put('/maintenance/:requestid',verifyToken('owner'), changeStatus);
ownerRouter.get('/maintenance',verifyToken('owner'), getMaintenanceRequest);
ownerRouter.get('/payment', verifyToken('owner'), paymentStats);
ownerRouter.get('/:houseid/requests', verifyToken('owner'), getVisitRequests);
ownerRouter.post('/:houseid/calendar', verifyToken('owner'), addHouseCalendar);
ownerRouter.get('/:houseid/history', verifyToken('owner'), occupancyHistory);
ownerRouter.get('/:houseid/tenant', verifyToken('owner'), currentTenant);
ownerRouter.delete('/:houseid/tenant', verifyToken('owner'), deleteTenant);
ownerRouter.get('/:username', getOwner);
ownerRouter.put('/:houseid/images', verifyToken('owner'), uploader.array('images', 10), editHouseImages);
ownerRouter.post('/:houseid', verifyToken('owner'), uploader.fields([{name:'nationalid', maxCount: 1, minCount: 1}, {name:'contract', maxCount: 1, minCount: 1}]), addTenant);
ownerRouter.put('/:houseid',verifyToken('owner'), editHouseInfo);
ownerRouter.put('/', verifyToken('owner'), uploader.single('nationalid'), editProfile);
ownerRouter.post('/', verifyToken("user"), uploader.single('nationalid'), addOwner);

export default ownerRouter;
