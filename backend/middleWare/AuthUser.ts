import express, { NextFunction } from "express";
import { UserView } from "../models/users/userView";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/users/IUser";
import User from "../models/users/User";
const AuthUser = async (req:express.Request,res:express.Response,next:NextFunction) => {
    let userData = {} as UserView;
    try {
        let token = await req.cookies["token"];
        if(token) {
            if(config.CLIENT_SECRET_KEY) {
                let payLoad:string | JwtPayload = jwt.verify(token,config.CLIENT_SECRET_KEY);
                if (typeof payLoad !== "string") {
                    let user: IUser | null = await User.findOne({
                        firstName: payLoad.firstName,
                        lastName: payLoad.lastName,
                        email: payLoad.email
                    });
                    if(user) {
                        userData = {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            userName: user.userName,
                            password: "",
                            accountNumber: user.accountNumber,
                            accountType: user.accountType,
                            amount: user.amount,
                            errorMessage: "",
                            lastLogIn: user.lastLogIn
                        };
                        req.body.userData = userData;
                        next();
                    } 
                    else {
                        res.clearCookie("token");
                        userData = {} as UserView;
                        userData.errorMessage = "User not found";
                        return res.status(400).json(userData);
                    }
                } 
                else {
                    res.clearCookie("token");
                    userData = {} as UserView;
                    userData.errorMessage = "Invalid cookie clear all cookies and re login";
                    return res.status(400).json(userData);
                }
            }
            else {
                userData = {} as UserView;
                userData.errorMessage = "Something went wrong. Our team has been notified and is working on a fix.";
                return res.status(500).json(userData);
            }
        }
        else {
            userData = {} as UserView;
            userData.errorMessage = "You have not logedin";
            return res.status(400).json(userData);
        }
    }
    catch(err) {
        return res.status(500).json(err);
    }
}
export default AuthUser;