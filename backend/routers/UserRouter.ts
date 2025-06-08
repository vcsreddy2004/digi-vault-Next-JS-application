import express from "express";
import { validationResult,body } from "express-validator";
import { UserView } from "../models/users/userView";
import { IUser } from "../models/users/IUser";
import User from "../models/users/User";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AuthUser from "../middleWare/AuthUser";
import { ITransaction } from "../models/transaction/ITransaction";
import {TransactionView} from "../models/transaction/transactionView";
import Transaction from "../models/transaction/Transaction";
const UserRouter:express.Router = express.Router();
UserRouter.post("/register",[
    body("firstName").not().isEmpty().withMessage("First Name can not left empty"),
    body("lastName").not().isEmpty().withMessage("Last Name can not left empty"),
    body("email").not().isEmpty().withMessage("Email can not left empty"),
    body("userName").not().isEmpty().withMessage("User Name can not left empty"),
    body("password").not().isEmpty().withMessage("Password can not left empty"),
    body("email").isEmail().withMessage("Invalid Email"),
],async(req:express.Request,res:express.Response)=>{
    let userData:UserView = {
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        userName:req.body.userName,
        password:req.body.password,
        accountNumber:0,
        accountType:"savings",
        amount:0,
        errorMessage:req.body.errorMessage,
        lastLogIn:null,
    }
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            userData = {} as UserView;
            const errorArray = errors.array();
            userData.errorMessage = errorArray.length > 0 ? errorArray[0].msg : "Validation error";
            return res.status(400).json(userData);
        }
        else {
            let token = await req.cookies["token"];
            if(token) {    
                userData = {} as UserView;
                userData.errorMessage = "logout in order to register new user";
                return res.status(400).json(userData);
            }
            else {
                let user:IUser | null = await User.findOne({
                    $or:[
                        {userName:userData.userName},
                        {email:userData.email}
                    ]
                });
                if(user) {
                    userData = {} as UserView;
                    userData.errorMessage = "user has already registered";
                    return res.status(400).json(userData);
                }
                else {
                    let salt:string = await bcrypt.genSalt(10);
                    userData.password = await bcrypt.hash(userData.password,salt);
                    let prevUser:IUser | null = await User.findOne().sort({ _id: -1 });
                    if(prevUser) {
                        userData.accountNumber = prevUser.accountNumber +1;
                    }
                    else {
                        userData.accountNumber = Math.floor(100000000 + Math.random() * 900000000);
                    }
                    user = await new User(userData);
                    user.save();
                    userData = {} as UserView;
                    return res.status(200).json(userData);
                }
            }
        }
    }
    catch(err) {
        return res.status(500).json(err);
    }
});
UserRouter.post("/login",[
    body("userName").not().isEmpty().withMessage("User Name can not left empty"),
    body("password").not().isEmpty().withMessage("Password can not left empty"),
],async(req:express.Request,res:express.Response)=>{
    let userData:UserView = {
        firstName:"",
        lastName:"",
        email:"",
        userName:req.body.userName,
        password:req.body.password,
        accountNumber:0,
        accountType:"savings",
        amount:0,
        errorMessage:"",
        lastLogIn:null,
    }
    try {
        let errors = validationResult(req);
        if(!errors.isEmpty()) {
            userData = {} as UserView;
            const errorArray = errors.array();
            userData.errorMessage = errorArray.length > 0 ? errorArray[0].msg : "Validation error";
            return res.status(400).json(userData);
        }
        else {
            let token = await req.cookies["token"];
            if(token) {    
                userData = {} as UserView;
                userData.errorMessage = "you have already loged in";
                return res.status(400).json(userData);
            }
            else {
                let user:IUser | null = await User.findOne({userName:userData.userName});
                if(user) {
                    let currentDate: Date = new Date(Date.now() - 4 * 60 * 60 * 1000);
                    if(user.lastLogIn > currentDate) {
                        userData = {} as UserView;
                        userData.errorMessage = "you have alreay loged in login after 4 hrs";
                        return res.status(400).json(userData);
                    }
                    else if(await bcrypt.compare(userData.password,user.password)) {
                        let payLoad = {
                            firstName:user.firstName,
                            lastName:user.lastName,
                            email:user.email,
                        }
                        if(config.CLIENT_SECRET_KEY) {
                            let token:string = jwt.sign(payLoad,config.CLIENT_SECRET_KEY);
                            user = await User.findOneAndUpdate({userName:user.userName},{lastLogIn:new Date()});
                            userData = {} as UserView;
                            res.cookie("token",token,{httpOnly:true,sameSite:"lax",secure:false,maxAge:4*60*60*1000});
                            return res.status(200).json(userData);
                        }
                        else {
                            userData = {} as UserView;
                            userData.errorMessage = "Something went wrong. Our team has been notified and is working on a fix.";
                            return res.status(500).json(userData);
                        }
                    }
                    else {
                        userData = {} as UserView;
                        userData.errorMessage = "Invalid Password";
                        return res.status(400).json(userData);
                    }
                }
                else {
                    userData = {} as UserView;
                    userData.errorMessage = "Username dose not exist";
                    return res.status(400).json(userData);
                }
            }
        }
    }
    catch(err) {
        return res.status(500).json(err);
    }
})
UserRouter.get("/me",AuthUser,async(req:express.Request,res:express.Response)=>{
    try {
        let userData:UserView = req.body.userData;
        return res.status(200).json(userData);
    }
    catch(err) {
        return res.status(500).json(err);
    }
});
UserRouter.get("/logout",AuthUser,async(req:express.Request,res:express.Response)=>{
    try {
        res.clearCookie("token");
        return res.status(200).json({});
    }
    catch(err) {
        return res.status(500).json(err);
    }
});
UserRouter.get("/transactions-list",AuthUser,async(req:express.Request,res:express.Response)=>{
    let pages = req.query.pages;
    let userData:UserView = req.body.userData;
    try {
        const page = typeof pages === "string" ? parseInt(pages, 10) : 1;
        const limit = 5;
        const skip = ((page || 1) - 1) * limit;
        let transaction:ITransaction[] = await Transaction.find({
            $or:[
                {fromAccount:userData.accountNumber},
                {toAccount:userData.accountNumber}
            ]
        }).skip(skip).limit(limit);
        let transactionData: TransactionView[] = transaction.map((transa) => ({
            fromAccount: transa.fromAccount,
            toAccount: transa.toAccount,
            amount: transa.amount,
            timeStamp: transa.timeStamp,
            type: transa.type,
            errorMessage: ""
        }));
        return res.status(200).json(transactionData);
    }
    catch(err) {
        return res.status(500).json(err);
    }
})
UserRouter.patch("/transfer",AuthUser,[
    body("toAccount").not().isEmpty().withMessage("TO account is not mentioned"),
    body("amount").not().isEmpty().withMessage("Amount is not mentioned"),
],async(req:express.Request,res:express.Response)=>{
    let transactionData:TransactionView = {
        fromAccount:0,
        toAccount:req.body.toAccount,
        amount:req.body.amount,
        timeStamp:new Date(),
        type:"transfer",
        errorMessage:""
    }
    try {
        let userData:UserView = req.body.userData;
        let user:IUser | null = await User.findOne({firstName:userData.firstName,lastName:userData.lastName,email:userData.email});
        if(user) {
            if(user.accountNumber!==transactionData.toAccount) {
                if(user.amount>transactionData.amount) {
                    let secondParty:IUser | null = await User.findOne({accountNumber:transactionData.toAccount});
                    if(secondParty) {
                        user = await User.findOneAndUpdate({accountNumber:user.accountNumber},{amount:user.amount-transactionData.amount});
                        secondParty = await User.findOneAndUpdate({accountNumber:secondParty.accountNumber},{amount:secondParty.amount+transactionData.amount});
                        transactionData = {
                            ...transactionData,
                            fromAccount: user && user.accountNumber !== undefined ? user.accountNumber : 0,
                            toAccount: secondParty && secondParty.accountNumber !== undefined ? secondParty.accountNumber : 0,
                        }
                        let transaction:ITransaction = await new Transaction(transactionData);
                        transaction.save();
                        transactionData = {} as TransactionView;
                        return res.status(200).json({});
                    }
                    else {
                        transactionData = {} as TransactionView;
                        transactionData.errorMessage = "account number not found";
                        return res.status(400).json(transactionData);
                    }
                }   
                else {
                    transactionData = {} as TransactionView;
                    transactionData.errorMessage = "Low balance";
                    return res.status(400).json(transactionData);
                }
            }
            else {
                transactionData = {} as TransactionView;
                transactionData.errorMessage = "You can not transfer your self";
                return res.status(401).json(transactionData);
            }
        }
        else {
            transactionData = {} as TransactionView;
            transactionData.errorMessage = "Invalid login";
            return res.status(400).json(transactionData);
        }
    }
    catch(err) {
        return res.status(200).json(err);
    }
})
export default UserRouter;