import express from "express"
import { createMaintainance, getMaintenanceRequest } from "../controllers/MaintainanceRequestController.js"
import verifyToken from "../utils/verifyToken.js"

const maintainanceRouter = express.Router()

  maintainanceRouter.post('/create',createMaintainance)
  maintainanceRouter.get('/get-maintenance-request',verifyToken('owner'),getMaintenanceRequest)

  export default maintainanceRouter;
