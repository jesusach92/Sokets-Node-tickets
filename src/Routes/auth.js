import { Router } from "express";
import { Logout, RefreshToken, singCtrl } from "../Controllers/auth.js";
const authRouter = Router();

authRouter.get("/", RefreshToken);

/* A route that is being created. */

authRouter.post("/", singCtrl);



authRouter.put("/",Logout)



export default authRouter;
