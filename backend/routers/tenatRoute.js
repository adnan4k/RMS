import express from "express";
import { addTenant, deleteTenant, editTenant, getTenant, getTenants } from "../controllers/TenantController.js";
import uploader from "../utils/fileProcessing.js";
import verifyToken from "../utils/verifyToken.js";
import { tenantRequests } from "../controllers/MaintainanceRequestController.js";

const tenantRouter  = express.Router();
tenantRouter.post('/create', verifyToken('owner'), uploader.fields([{name:'national_id', maxCount: 1, minCount: 1}, {name:'contract_photo', maxCount: 1, minCount: 1}]), addTenant);
tenantRouter.get('/maintenance', verifyToken('user'), tenantRequests)

tenantRouter.put('/edit',editTenant);
tenantRouter.delete('/delete/:id',deleteTenant);
tenantRouter.get('/tenant/:id',getTenant);

export default tenantRouter