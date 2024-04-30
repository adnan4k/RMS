import express from "express";
import { addHouse, deleteHouse, editHouse, getHouse, getHouses } from "../controllers/HouseController.js";

const houseRouter  = express.Router();
 houseRouter.post('/create',addHouse);
 houseRouter.put('/edit',editHouse);
 houseRouter.delete('/delete/:id',deleteHouse);
 houseRouter.get('/house/:id',getHouse)
 houseRouter.get('/houses/',getHouses)


export default houseRouter