import express from "express"
import mongoose from "mongoose";
import bodyParser from "body-parser"
import cors from 'cors'
import dotenv from 'dotenv'


const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static('public'))
dotenv.config();
//   app.use(express.urlencoded({extended:true}));
app.use('/images',express.static('images'))

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