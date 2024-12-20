import express from 'express';
import mongoose from 'mongoose';
import router from './routes/api.js'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {PORT, MONGODB_CONNECTION} from "./app/configuration/config.js";


const app = express();

//
app.use(bodyParser.json());

// mongodb connection

mongoose.connect(MONGODB_CONNECTION, {autoIndex: true})
    .then((res)=>{
        console.log("connected to MongoDB");
    })
    .catch((err)=>{
    console.log("not connected to MongoDB");
    })


app.use("/api/v1", router)

app.listen(PORT, ()=>{
    console.log(`Server Run at http://localhost:${PORT}`)
})
