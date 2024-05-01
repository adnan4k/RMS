import express from "express";
import { addOwner } from "../controllers/OwnerController.js";
import verifyToken from "../utils/verifyToken.js";
import uploader from "../utils/fileProcessing.js"

const ownerRouter  = express.Router();

ownerRouter.post('/createowner', verifyToken("user"), uploader.single('national_id'), addOwner);

export default ownerRouter;
