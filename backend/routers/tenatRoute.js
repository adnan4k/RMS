import express from "express";
import { deleteTenant, editTenant, getTenant } from "../controllers/TenantController.js";
import uploader from "../utils/fileProcessing.js";
import verifyToken from "../utils/verifyToken.js";
import { changeStatus, createMaintainance, deleteRequest, editRequest, tenantRequests } from "../controllers/MaintainanceRequestController.js";
import { payRent } from "../controllers/PaymentController.js";

const tenantRouter  = express.Router();
tenantRouter.post('/maintenance', verifyToken('tenant'), createMaintainance);
tenantRouter.get('/maintenance', verifyToken('tenant'), tenantRequests);
tenantRouter.put('/maintenance/edit/:requestid', verifyToken('tenant'), changeStatus);
tenantRouter.delete('/maintenance/:requestid', verifyToken('tenant'), deleteRequest);
tenantRouter.put('/maintenance/:requestid', verifyToken('tenant'), editRequest);
tenantRouter.post('/payrent', verifyToken('tenant'), payRent);
tenantRouter.delete('/:id', verifyToken('owner'), deleteTenant);
tenantRouter.get('/:id', verifyToken('tenant', 'owner'), getTenant);
tenantRouter.put('/', verifyToken('tenant'), uploader.single('nationalid'), editTenant);

export default tenantRouter