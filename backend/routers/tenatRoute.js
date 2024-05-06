import express from "express";
import { addTenant, deleteTenant, editTenant, getTenant, getTenants } from "../controllers/TenantController.js";
import uploader from "../utils/fileProcessing.js";
import verifyToken from "../utils/verifyToken.js";
import { createMaintainance, tenantRequests } from "../controllers/MaintainanceRequestController.js";

const tenantRouter  = express.Router();
tenantRouter.post('/maintenance', verifyToken('tenant'), createMaintainance);
tenantRouter.get('/maintenance', verifyToken('tenant'), tenantRequests);
// and put will be here
tenantRouter.put('/edit',editTenant);
tenantRouter.delete('/delete/:id',deleteTenant);
tenantRouter.get('/tenant/:id',getTenant);

export default tenantRouter