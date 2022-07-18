import { Router } from "express";
import { addUtype, deleteUtype, getUtype, getUtypes, putUtype } from "../Controllers/usertypes.js ";
import { verifiyRole } from "../Middleweres/auth.js";

const UserTypeRouter = Router();

UserTypeRouter.get("/",verifiyRole([2,3,4,5]),getUtypes)

UserTypeRouter.get("/:id",verifiyRole([2,3,4,5]),getUtype)

UserTypeRouter.post("/",verifiyRole([4,5]), addUtype)

UserTypeRouter.put("/",verifiyRole([4,5]),putUtype)

UserTypeRouter.delete("/:id",verifiyRole([4,5]),deleteUtype)

export default UserTypeRouter;