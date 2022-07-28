import { Router } from "express";
import { Logout, RefreshToken, singCtrl } from "../Controllers/auth.js";
const authRouter = Router();

authRouter.get("/", RefreshToken);

authRouter.post("/", singCtrl);



authRouter.delete("/",Logout)



export default authRouter;
