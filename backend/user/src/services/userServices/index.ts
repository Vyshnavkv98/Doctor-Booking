import User, { userInterface } from "../../models/user"
import bcrypt from "bcrypt"
import env from "../../environment/env";
import jwt from "jsonwebtoken"
import NotFoundError from "../../utils/notFoundError";
import sendMailVerification from "../../utils/sendMailVerification";
import InternalServerError from "../../utils/InternalServerError"
import NodeCache = require("node-cache");
import { type } from "os";

const userCache = new NodeCache()
const otpCache = new NodeCache()

type userDataType = {
    email: string,
    password: string
};
type userCaches = {
    email?: string,
    password?: string,
    firstName?: string,
    lastName?: string,
    dob?: Date | string,
}

type jwtType = {
    iv: Buffer,
    _id: string
};
const uknownUserType = User as unknown;
const UserStaticType = uknownUserType as {
    findByCreds: (email: string, password: string) => Promise<userInterface>;
};

class userServices {
    constructor() {
    }
    createUser = async (userData: userCaches) => {
        const response = await sendMailVerification(userData.firstName!, userData.email!)
        if (!response) {
            throw new NotFoundError("Cannot find otp")
        }
        userCache.set(userData.email!, userData)
        otpCache.set(userData.email!, response)
        console.log(response,'from sentemail');
        

        

    }

    verifyOtp = async (otp: string,email:string) => {

        console.log(email,'verify otp 56');
        
        const userData:any=userCache.get(email)
        const genOtp =otpCache.get(email)
        console.log(genOtp,otp);
        
        if(otp===genOtp){
            const user = new User({
                firstName: userData.firstname,
                lastName: userData.lastname,
                email: userData.email,
                emailVerified: false,
                phoneNumber:userData.phoneNumber,
                password: userData.password
    
            })
    
            await user.save()
            if (!user) throw new NotFoundError("User not Found")
        }else{
            return false
        }

        }


    login = async (userData: userDataType, uuid: string | undefined) => {



        const email = userData.email;
        const password = userData.password;

        const user = await UserStaticType.findByCreds(email, password);

        if (!user) throw new NotFoundError("Cannot Find User");
        
        

        const { accessToken, refreshToken } = await user.generateAuthToken(uuid);
        console.log(accessToken, refreshToken, 'service');


        if (!accessToken || !refreshToken) throw new NotFoundError("Login User Not Found Error");



        return { user, accessToken, refreshToken }
    }
    logout = async (userid: string, refreshToken: string) => {

        const user = await User.findById(userid)
        if (!user) throw new NotFoundError("Could Not Find User");

        if (refreshToken) {
            const decoded = jwt.verify(refreshToken, env.passwordRefresh!) as jwtType
            const encryptionkey = 'my-encryption-key'
            const encryptedToken = user.encryptToken(refreshToken, encryptionkey, decoded.iv)


            for (let i = 0; i < user.tokens!.length; i++) {

                const currentEncryptedToken = user.tokens![i].token;

                if (currentEncryptedToken === encryptedToken) {

                    user.tokens!.splice(i, 1);
                    console.log("logut from service");

                    await user.save();
                    break;
                }
            }
        }
        await user.save()
    }

    logoutAll = async (userid: string) => {

        const user = await User.findById(userid);
        console.log(user, 'logoutall');

        if (!user) throw new NotFoundError("Could Not Find User");
        user.tokens = [];
        await user.save();
    }

}
export default userServices;