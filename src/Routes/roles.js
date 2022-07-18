import { Router } from "express";
import { addRole, deleteRole, getRole, getRoles, putRole } from "../Controllers/roles.js";
import { verifiyRole } from "../Middleweres/auth.js";

const RoleRouter = Router();


RoleRouter.get("/",verifiyRole([4,5]), getRoles)

RoleRouter.get("/:id",verifiyRole([4,5]), getRole)

RoleRouter.post("/",verifiyRole([4,5]),addRole)

RoleRouter.put("/",verifiyRole([4,5]),putRole)

RoleRouter.delete("/:id",verifiyRole([4,5]),deleteRole)

export default RoleRouter;