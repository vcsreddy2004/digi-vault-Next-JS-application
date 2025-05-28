import express from "express";
import cors from "cors";
import config from "./config";
import mongoose from "mongoose";
import UserRouter from "./routers/UserRouter";
import cookieParser from "cookie-parser";
const app:express.Application = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/users",UserRouter);
if(config.MONGO_DB_URL) {
    mongoose.connect(config.MONGO_DB_URL).then((res)=>{
        console.log("mongo db connected");
    }).catch((err)=>{
        console.log("error in mongodb connection");
    });
}
app.get("/",(req:express.Request, res:express.Response) => {
    return res.status(200).json({
        "msg":"server is running"
    });
});
if(config.PORT) {
    app.listen(config.PORT,()=>{
        console.log("server started");
    })
}