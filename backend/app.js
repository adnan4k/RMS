import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from 'cors'
import dotenv from 'dotenv'
import userRouter from "./routers/userRoutes.js";
import tenantRouter from "./routers/tenatRoute.js";
import houseRouter from "./routers/houseRoutes.js";
import ownerRouter from "./routers/ownerRoutes.js";
import cookieParser from "cookie-parser";
import maintainanceRouter from "./routers/maintainance.js";

process.env.TZ = 'UTC';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser())
app.use(express.static('public'))
dotenv.config();
app.use(express.urlencoded({extended:true}));

app.use('/uploads',express.static('uploads'));
app.use('/user',userRouter);
app.use('/tenant',tenantRouter);
app.use('/house',houseRouter)
app.use('/owner', ownerRouter);
app.use('/maintenance', maintainanceRouter);

//error handler
app.use((err,req,res,next) =>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message ||" something went wrong";
  return res.status(errorStatus).json({
   status:errorStatus,
   success:false,
   message:errorMessage,
   stack:err.stack
  })
})


const port = process.env.PORT 
const mongodb_url = process.env.MONGO_URL

mongoose.connect(mongodb_url)
  .then(() => {
    app.listen(port, () => {
      console.log("App is listening on port", port);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
