import { Router } from "express";
import { addEmploye, deleteEmploye, getEmploye, getEmployes,  updateEmploye } from "../Controllers/employes";
import { verifyAuth, verifiyRole } from "../Middleweres/auth";

const router = Router();

router.use("/", verifyAuth)

router.get("/", verifiyRole([4,5]) , getEmployes);

router.get("/:id", verifiyRole([2, 5]), getEmploye);

router.post("/", verifiyRole([4, 5]), addEmploye);

router.put("/:id", verifiyRole([4,2, 5]) ,updateEmploye);

router.delete("/:id",verifiyRole([4,5]), deleteEmploye);

module.exports = router;
