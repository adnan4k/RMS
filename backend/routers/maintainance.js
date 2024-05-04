import express from "express"
import { createMaintainance, getMaintenanceRequest } from "../controllers/MaintainanceRequestController.js"

const maintainanceRouter = express.Router()

  maintainanceRouter.post('/create',createMaintainance)
  maintainanceRouter.get('/get-maintenance-request',getMaintenanceRequest)

  export default maintainanceRouter;
