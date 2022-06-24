import { Router } from "express";
import { Logout, RefreshToken, singCtrl } from "../Controllers/auth.js";
const authRouter = Router();


/* A route that is being created. */
authRouter.post("/login", singCtrl);

authRouter.get("/update", RefreshToken);

authRouter.put("/logout",Logout)



export default authRouter;
