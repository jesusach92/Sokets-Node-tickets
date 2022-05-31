import { Router } from "express";
import { addRole, addUserType, getUserTypes } from "../Controllers/config";
import { verifiyRole, verifyAuth } from "../Middleweres/auth";
const router = Router();

router.get("/userTypes", verifyAuth, getUserTypes)

router.post("/Add/UserType",verifyAuth ,addUserType)

router.post("/Add/Rol",verifyAuth ,addRole)



module.exports = router
