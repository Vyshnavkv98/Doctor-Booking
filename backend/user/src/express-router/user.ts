import { Router } from "express";
import UserController from "../controller/user";
import auth from "../middleware/auth"
import authLogout from "../middleware/authLogout"
import {Request,Response} from 'express'
import upload from "../db/utils/s3";

const userController = new UserController();
const router = Router();


router.get("/user",userController.getUser)
router.post("/login",userController.login)
router.post("/signup", userController.createUser);
router.post("/verfyotp", userController.verifyOtp);
router.post("/get-token", userController.getToken);
router.post("/logout",authLogout,userController.logout)
router.post("/logoutAll",authLogout,userController.logoutAll)





export default router;