import { Document } from "mongoose"
export interface ITransaction extends Document {
    fromAccount:number,
    toAccount:number,
    amount:number,
    type:"transfer" | "deposit" | "withdrawal",
    timeStamp:Date,
}