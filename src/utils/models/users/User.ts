import { Schema } from "mongoose";
import mongoose from "mongoose";
import { IUser } from "./IUser";

const userSchema: Schema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    userName: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    amount: { type:Number, default:0},
    accountNumber: { type: Number, require: true, unique: true },
    accountType: { type: String, enum: ["admin", "savings"], require: true },
    lastLogIn: { type: Date }
});
export default mongoose.model<IUser>("users",userSchema);