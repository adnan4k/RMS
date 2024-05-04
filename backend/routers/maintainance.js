import express from "express"
import { createMaintainance } from "../controllers/MaintainanceRequestController.js"

const maintainanceRouter = express.Router()

  maintainanceRouter.post('/create',createMaintainance)

  export default maintainanceRouter;
