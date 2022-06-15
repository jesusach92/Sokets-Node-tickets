import { Router } from "express";
import { addPhone, addRole, addUserType, getUserTypes } from "../Controllers/config.js";
import { verifiyRole, verifyAuth } from "../Middleweres/auth.js";
const configRouter = Router();

/* A route that is being defined. */
configRouter.get("/userTypes", verifyAuth,verifiyRole([3,4,5]), getUserTypes)

/* Defining a route. */
configRouter.post("/Add/UserType",verifyAuth,verifiyRole([4,5]) ,addUserType)

/* Defining a route. */
configRouter.post("/Add/Rol",verifyAuth,verifiyRole([4,5]) ,addRole)

configRouter.post("/Add/phone", addPhone)


export default configRouter
