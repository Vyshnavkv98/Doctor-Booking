import { Router } from "express";
import AdminController from "../controller/admin"
import adminAuth from "../middleware/adminAuth"
import adminAuthLogout from "../middleware/adminAuthLoguot"

const adminController = new AdminController();
const adminRouter = Router();

adminRouter.post("/admin/login",adminController.login)
adminRouter.post("/admin/get-token", adminController.getToken);
adminRouter.post("/admin/logout",adminAuth,adminController.logout)
adminRouter.post("/admin/logoutAll",adminAuthLogout,adminController.logoutAll)
adminRouter.get("/admin/getuser",adminController.getUsers)

export default adminRouter