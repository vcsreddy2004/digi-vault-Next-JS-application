import { Document } from "mongoose"
export interface IUser extends Document {
    firstName:string,
    lastName:string,
    email:string,
    userName:string,
    password:string,
    amount:number,
    accountNumber:number,
    accountType: "savings" | "admin"
    lastLogIn: Date,
}