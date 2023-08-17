import { Request, Response } from "express"
import { userInterface } from "../models/user";
import { createLoginCookie,createLogoutCookie } from "../cookies/cookies"
import NotFoundError from "../utils/notFoundError";
import InternalServerError from "../utils/InternalServerError";
import adminServices from "../services/adminServices/index"
import User from "../models/user"


const adminProvider=new adminServices()


type userAccessType = {
    _id: string,
    email: string,
    password:string
}
interface RequestTypeRefresh extends Request {
    admin?: userInterface,
    encryptedToken?: string
}

interface RequestType extends Request {
    admin?: userAccessType,
    encryptedToken?: string
}

class adminController{
    constructor(){

    }
    login = async (req: Request, res: Response) => {

        try {
            console.log('login first');

            const currentUUID = req.headers.uuid as string;
            const body = req.body
            const { admin, accessToken, refreshToken } = await adminProvider.login(body, currentUUID);
            createLoginCookie(res, accessToken, refreshToken);
            if (!admin) {
                res.status(401).send({message:'email or password incorrect'})
            }

            res.status(200).send({ admin,message:'login success' });

        } catch (e: any) {
            console.log("\nLogin admin Route Error:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            res.status(code).send(e.mesaage);
        }

    }
    getToken = async (req: RequestTypeRefresh, res: Response) => {

        try {

            const admin = req.admin;

            if (!admin) throw new NotFoundError("User Not Found");

            const currentUUID = req.headers.uuid as string;

            const { accessToken, refreshToken } = await admin.generateAuthToken(currentUUID);

            if (!accessToken || !refreshToken) throw new InternalServerError("User/Access/Refresh Token Missing");

            createLoginCookie(res, accessToken, refreshToken);

            res.status(201).send();

        } catch (e: any) {

            console.log("\nGet Refresh Token admin Route Error:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            res.status(code).send();
        }
    }
  getUsers=async(req:Request,res:Response)=>{
        try {
            
          const users=await User.find()
          if(!users){
            res.status(500).send({message:"Cannot find users"})
          }
          res.status(200).send(users)

        } catch (e:any) {
            console.log("\nGet Refresh Token admin Route Error:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            res.status(code).send();
        }
    }

    logout = async (req: RequestType, res: Response) => {
        try {
            console.log(req.admin, 'loginpage   cannot find user');
            if (!req.admin) return;

            const userid = req.admin._id;


            const refreshToken = req.cookies["refresh-token"];
            console.log(userid);

            await adminProvider.logout(userid, refreshToken);
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
        console.log(req.admin, 'logout');

        if (!req.admin) return;

        try {

            const userid = req.admin._id;
            console.log(userid, '131');

            await adminProvider.logoutAll(userid);

            createLogoutCookie(res);

            res.status(204).send();

        } catch (e: any) {

            console.log("\nLogout All admin Route Error:", e.message);
            const code = !e.code ? 500 : e.code >= 400 && e.code <= 599 ? e.code : 500;
            res.status(code).send();
        }
    }

}
export default adminController