import userServices from "../services/userServices";
import { Request, Response } from "express"
import { userInterface } from "../models/user";
import { createLoginCookie, createLogoutCookie } from "../cookies/cookies"
import NotFoundError from "../utils/notFoundError";
import InternalServerError from "../utils/InternalServerError";
import { randomUUID } from "crypto";

const userProvider = new userServices()

type userAccessType = {
    _id: string,
    emailVerified: boolean,
    email: string,
    admin: boolean,
    botChecked: boolean,
    username: string,
}

interface RequestTypeRefresh extends Request {
    user?: userInterface,
    encryptedToken?: string
}

interface RequestType extends Request {
    user?: userAccessType,
    encryptedToken?: string
}


class UserController {

    constructor() {

    }

    createUser = async (req: RequestType, res: Response) => {


        try {

            // const currentUUID = req.headers.uuid as string;
            //    const currentUUID="fffffffff"
            //     console.log('fffffffff','rrrrrrrrr');


            // const {user, accessToken, refreshToken} = await userProvider.createUser(req.body, currentUUID);
            await userProvider.createUser(req.body);
            
            res.status(201).send("register successful");
            

           

        } catch (e: any) {

            console.log("\nCreate User Route Error:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            res.status(code).send();
        }
    }
    verifyOtp = async (req: RequestType, res: Response) => {
        try {
            const { otp, email } = req.body
            await userProvider.verifyOtp(otp, email);
            res.status(201).send({message:"registration success"});

        } catch (e: any) {
            console.log("\nverify otp:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            res.status(code).send();
        }
    }


    getUser = async (req: RequestType, res: Response) => {

        try {

            const user = req.user!;

            res.send(user)

        } catch (e: any) {

            console.log("\nGet User Route Error:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            res.status(code).send();
        }
    }

    login = async (req: Request, res: Response) => {

        try {
            console.log('login first');

            const currentUUID = req.headers.uuid as string;
            console.log(currentUUID,'currentuuid');
            
            const body = req.body
            const { user, accessToken, refreshToken } = await userProvider.login(body, currentUUID);
             createLoginCookie(res, accessToken, refreshToken);
             console.log(req.headers.authorization,'accesstoken   from login  and cookies');
             
            if (!user) {
                res.status(401).send(('email or password incorrect'))
            }

            res.status(200).send({ user,accessToken,refreshToken });

        } catch (e: any) {
            console.log("\nLogin User Route Error:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            res.status(code).send(e.mesaage);
        }

    }
    getToken = async (req: RequestTypeRefresh, res: Response) => {

        try {

            const user = req.user;

            if (!user) throw new NotFoundError("User Not Found");

            const currentUUID = req.headers.uuid as string;

            const { accessToken, refreshToken } = await user.generateAuthToken(currentUUID);

            if (!accessToken || !refreshToken) throw new InternalServerError("User/Access/Refresh Token Missing");

            createLoginCookie(res, accessToken, refreshToken);

            res.status(201).send();

        } catch (e: any) {

            console.log("\nGet Refresh Token User Route Error:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            res.status(code).send();
        }
    }

    logout = async (req: RequestType, res: Response) => {
        try {
            console.log(req.user, 'loginpage   cannot find user');
            if (!req.user) return;

            const userid = req.user._id;


            const refreshToken = req.cookies["refresh-token"];
            console.log(userid);

            await userProvider.logout(userid, refreshToken);
            createLogoutCookie(res)
            res.send("logout successfully");
        } catch (e: any) {
            console.log("\nLogout User Route Error:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            createLogoutCookie(res);
            res.status(code).send();
        }
    }
    logoutAll = async (req: RequestType, res: Response) => {
        console.log(req.user, 'logout');

        if (!req.user) return;

        try {

            const userid = req.user._id;
            console.log(userid, '131');


            await userProvider.logoutAll(userid);

            createLogoutCookie(res);

            res.status(204).send();

        } catch (e: any) {

            console.log("\nLogout All User Route Error:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            res.status(code).send();
        }
    }
}

export default UserController;