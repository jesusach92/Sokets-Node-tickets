import { Router } from "express";
import { addRole, addUserType, getUserTypes } from "../Controllers/config";
import { verifiyRole, verifyAuth } from "../Middleweres/auth";
const router = Router();

router.get("/userTypes", verifyAuth,verifiyRole([3,4,5]), getUserTypes)

router.post("/Add/UserType",verifyAuth,verifiyRole([4,5]) ,addUserType)

router.post("/Add/Rol",verifyAuth,verifiyRole([4,5]) ,addRole)



module.exports = router
