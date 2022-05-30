import { Router } from "express";
import { addUserType, getUserTypes } from "../Controllers/config";
import { verifiyRole, verifyAuth } from "../Middleweres/auth";
const router = Router();

router.get("/userTypes", verifyAuth, verifiyRole([999,1]), getUserTypes)

router.post("/Add/UserType", verifyAuth, verifiyRole([999,1]),addUserType)

module.exports = router