import { Router } from "express";
import { addEmploye, deleteUser, getEmploye, getEmployes,  updateUser } from "../Controllers/employes";
import { verifyAuth, verifiyRole } from "../Middleweres/auth";

const router = Router();

router.get("/",verifyAuth, verifiyRole(1) , getEmployes);

router.get("/:id", getEmploye);

router.post("/", addEmploye);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
