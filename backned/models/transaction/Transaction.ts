import { Schema } from "mongoose";
import mongoose from "mongoose";
import { ITransaction } from "./ITransaction";

let transactionSchema: Schema = new mongoose.Schema({
    fromAccount:{type:Number,default:0},
    toAccount:{type:Number,default:0},
    amount:{type:Number,require:true},
    type:{type:String,enum:["transfer" ,"deposit" ,"withdrawal"],require:true},
    timeStamp:{type:Date}
});
export default mongoose.model<ITransaction>("transactions",transactionSchema);