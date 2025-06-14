import express from "express";
import { body, validationResult } from "express-validator";
import { TransactionView } from "../models/transaction/transactionView";
import { IUser } from "../models/users/IUser";
import User from "../models/users/User";
import Transaction from "../models/transaction/Transaction";
import { ITransaction } from "../models/transaction/ITransaction";
import AuthUser from "../middleWare/AuthUser";
import { UserView } from "../models/users/userView";
const AdminRouter:express.Router = express.Router();
AdminRouter.get("/users-list",AuthUser,async(req:express.Request,res:express.Response)=>{
    try {
        const userData:IUser = req.body.userData;
        if(userData.accountType==="savings") {
            let user:UserView = {} as UserView;
            user.errorMessage = "YOu have no rights to access this Service";
            return res.status(401).json(user);
        }
        else {
            let users:IUser[] = await User.find();
            let usersList:UserView[] = users.map((e)=>({
                firstName:e.firstName,
                lastName:e.lastName,
                email:e.email,
                userName:e.userName,
                accountNumber:e.accountNumber,
                accountType:e.accountType,
                amount:e.amount,
                password:"",
                lastLogIn:e.lastLogIn,
                errorMessage:""
            }));
            return res.status(200).json(usersList);
        }
    }
    catch(err) {
        return res.status(500).json(err);
    }
});
AdminRouter.patch("/transaction",AuthUser,[
    body("account").not().isEmpty().withMessage("From Account can not left empty"),
    body("amount").not().isEmpty().withMessage("Amount can not left empty"),
    body("type").not().isEmpty().withMessage("Transaction type can not left empty"),
],async(req:express.Request,res:express.Response)=>{
    let transactionData:TransactionView = {
        fromAccount:0,
        toAccount:0,
        amount:req.body.amount,
        type:req.body.type,
        timeStamp:new Date(),
        errorMessage:""
    }
    try {
        const userData:IUser = req.body.userData;
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            const errorArray = errors.array();
            transactionData = {} as TransactionView;
            transactionData.errorMessage = errorArray[0].msg;
            return res.status(400).json(transactionData);
        }
        else if(userData.accountType==="savings") {
            transactionData = {} as TransactionView;
            transactionData.errorMessage = "YOu have no rights to access this Service";
            return res.status(401).json(transactionData);
        }
        else {
            if(transactionData.type === "withdrawal") {
                transactionData = {
                    ...transactionData,
                    fromAccount:req.body.account
                }
                let user:IUser | null = await User.findOne({accountNumber: transactionData.fromAccount});
                if (user) {
                    if(user.amount>=transactionData.amount) {
                        const updatedUser = await User.findOneAndUpdate(
                            { accountNumber: transactionData.fromAccount },
                            { amount: user.amount - transactionData.amount },
                            { new: true }
                        );
                        let transaction:ITransaction = await new Transaction(transactionData);
                        transaction.save();
                        return res.status(200).json({});
                    }
                    else {
                        transactionData = {} as TransactionView;
                        transactionData.errorMessage = "Insufficient funds";
                        return res.status(400).json(transactionData);
                    }
                }
                else {
                    transactionData = {} as TransactionView;
                    transactionData.errorMessage = "Account number found";
                    return res.status(400).json(transactionData);
                }
            }
            else if(transactionData.type === "deposit") {
                transactionData = {
                    ...transactionData,
                    toAccount:req.body.account
                }
                let user:IUser | null = await User.findOne({accountNumber: transactionData.toAccount});
                if (user) {
                    const updatedUser = await User.findOneAndUpdate(
                        { accountNumber: transactionData.toAccount },
                        { amount: user.amount + transactionData.amount },
                        { new: true }
                    );
                    let transaction:ITransaction = await new Transaction(transactionData);
                    transaction.save();
                    return res.status(200).json({});
                }
                else {
                    transactionData = {} as TransactionView;
                    transactionData.errorMessage = "Account number not found";
                    return res.status(400).json(transactionData);
                }
            }
            else {
                transactionData = {} as TransactionView;
                transactionData.errorMessage = "only withdrawal and deposit are accepted";
                return res.status(400).json(transactionData);
            }
        }
    }
    catch(err) {
        return res.status(500).json(err);
    }
});
export default AdminRouter;