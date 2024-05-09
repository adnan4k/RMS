import express from "express";
import { addTenant, deleteTenant, editTenant, getTenant, getTenants } from "../controllers/TenantController.js";
import uploader from "../utils/fileProcessing.js";
import verifyToken from "../utils/verifyToken.js";
import { createMaintainance, tenantRequests } from "../controllers/MaintainanceRequestController.js";

const tenantRouter  = express.Router();
tenantRouter.get('/:username', verifyToken('tenant', 'owner'), getTenant);
tenantRouter.put('/', verifyToken('tenant'), uploader.single('national_id'), editTenant);
tenantRouter.post('/maintenance', verifyToken('tenant'), createMaintainance);
tenantRouter.get('/maintenance', verifyToken('tenant'), tenantRequests);
// and put will be here
tenantRouter.delete('/delete/:id',deleteTenant);

export default tenantRouter