import express from "express";
import { validationResult,body } from "express-validator";
import { UserView } from "../models/users/userView";
const UserRouter:express.Router = express.Router();
UserRouter.post("/register",[
    body("firstName").not().isEmpty().withMessage("First Name can not left empty"),
    body("lastName").not().isEmpty().withMessage("Last Name can not left empty"),
    body("email").not().isEmpty().withMessage("Email can not left empty"),
    body("password").not().isEmpty().withMessage("Password can not left empty"),
    body("confirmPassword").not().isEmpty().withMessage("Confirm Password can not left empty"),
    body("email").isEmail().withMessage("Invalid Email"),
],async(req:express.Request,res:express.Response)=>{
    let errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    else {
        let userData:UserView = {
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            userName:req.body.userName,
            accountNumber:0,
            accountType:"savings",
            password:req.body.email,
            token:"",
            errorMessage:req.body.errorMessage,
            lastLogIn:null,
        }
        userData.token = await req.cookies["token"];
        if(userData.token) {    
            userData = {} as UserView;
            userData.errorMessage = "logout in order to register new user";
            return res.status(400).json(userData);
        }
        return res.status(200).json(req.body);
    }
});
export default UserRouter;