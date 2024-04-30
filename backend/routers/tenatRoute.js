import express from "express";
import { addTenant, deleteTenant, editTenant, getTenant, getTenants } from "../controllers/TenantController.js";

const tenantRouter  = express.Router();
 tenantRouter.post('/create',addTenant);
 tenantRouter.put('/edit',editTenant);
 tenantRouter.delete('/delete/:id',deleteTenant);
 tenantRouter.get('/tenant/:id',getTenant);
 tenantRouter.get('/tenants',getTenants);

export default tenantRouter