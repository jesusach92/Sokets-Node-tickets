import { Router } from "express";
import { addEmploye, deleteEmploye, getEmploye, getEmployes,  updateEmploye } from "../Controllers/employes";
import { verifyAuth, verifiyRole } from "../Middleweres/auth";

const router = Router();

router.get("/",verifyAuth, verifiyRole([4]) , getEmployes);

router.get("/:id",verifyAuth, verifiyRole, getEmploye);

router.post("/", verifyAuth, verifiyRole([4]), addEmploye);

router.put("/:id", updateEmploye);

router.delete("/:id", deleteEmploye);

module.exports = router;
