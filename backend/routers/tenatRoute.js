import express from "express";
import { addTenant, deleteTenant, editTenant, getTenant, getTenants } from "../controllers/TenantController.js";
import uploader from "../utils/fileProcessing.js";

const tenantRouter  = express.Router();
tenantRouter.post('/create', uploader.single('national_id'), addTenant);
tenantRouter.put('/edit',editTenant);
tenantRouter.delete('/delete/:id',deleteTenant);
tenantRouter.get('/tenant/:id',getTenant);
tenantRouter.get('/tenants',getTenants);

export default tenantRouter