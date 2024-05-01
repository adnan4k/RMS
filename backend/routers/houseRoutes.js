import express from "express";
import { createHouse } from "../controllers/houseController";
import { file_name } from "../utils/file_processing";

const houseRouter  = express.Router();

const storage = multer.diskStorage({
    destination: "../uploads",
    filename: file_name,
});
const uploader = multer({
    storage,
    fileFilter: filtering
})

houseRouter.post('/:id', createHouse);