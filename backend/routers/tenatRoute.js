import express from "express";
import { addTenant, deleteTenant, editTenant, getTenant, getTenants } from "../controllers/TenantController.js";
import uploader from "../utils/fileProcessing.js";
import verifyToken from "../utils/verifyToken.js";
import { createMaintainance, editRequest, tenantRequests } from "../controllers/MaintainanceRequestController.js";
import { payRent } from "../controllers/PaymentController.js";

const tenantRouter  = express.Router();
tenantRouter.post('/maintenance', verifyToken('tenant'), createMaintainance);
tenantRouter.get('/maintenance', verifyToken('tenant'), tenantRequests);
tenantRouter.put('/maintenance/:requestid', verifyToken('tenant'), editRequest);
tenantRouter.post('/payrent', verifyToken('tenant'), payRent);
tenantRouter.delete('/delete/:id',deleteTenant);
tenantRouter.get('/:id', verifyToken('tenant', 'owner'), getTenant);
tenantRouter.put('/', verifyToken('tenant'), uploader.single('nationalid'), editTenant);

export default tenantRouter