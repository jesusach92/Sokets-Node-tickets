import { Router } from "express";
import { addEmploye, getEmploye, getEmployes,  updateEmploye } from "../Controllers/employes.js";
import {  verifiyRole, verifySession,} from "../Middleweres/auth.js";

const employesRouter = Router();

employesRouter.get("/", /*verifiyRole([2,3,4,5]),*/ getEmployes);

employesRouter.get("/:id", /*verifiyRole([2,5]),*/ getEmploye);

employesRouter.post("/", /*verifiyRole([4, 5]),*/ addEmploye);

employesRouter.put("/", /*verifiyRole([4,2, 5]),*/ updateEmploye);

export default employesRouter;
