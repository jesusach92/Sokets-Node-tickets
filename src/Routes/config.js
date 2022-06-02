import { Router } from "express";
import { addPhone, addRole, addUserType, getUserTypes } from "../Controllers/config";
import { verifiyRole, verifyAuth } from "../Middleweres/auth";
const router = Router();

/* A route that is being defined. */
router.get("/userTypes", verifyAuth,verifiyRole([3,4,5]), getUserTypes)

/* Defining a route. */
router.post("/Add/UserType",verifyAuth,verifiyRole([4,5]) ,addUserType)

/* Defining a route. */
router.post("/Add/Rol",verifyAuth,verifiyRole([4,5]) ,addRole)

router.post("/Add/phone", addPhone)


module.exports = router
