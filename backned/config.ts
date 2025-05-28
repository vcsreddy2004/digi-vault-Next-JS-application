import dotenv from "dotenv";
dotenv.config({path:"./.env"})
const PORT:string | undefined = process.env.PORT;
const MONGO_DB_URL:string | undefined = process.env.MONGO_DB_URL;
export default {PORT,MONGO_DB_URL};