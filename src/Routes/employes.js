import { Router } from "express";
import { addEmploye, asingComputer, getEmploye, getEmployes,  reasingComputer,  updateEmploye } from "../Controllers/employes.js";
import { verifyAuth, verifiyRole, verifySession,} from "../Middleweres/auth.js";

const employesRouter = Router();

employesRouter.use("/", verifySession ,verifyAuth)

employesRouter.get("/", verifiyRole([4,5]) , getEmployes);

employesRouter.get("/:id", verifiyRole([2, 5]), getEmploye);

employesRouter.post("/", verifiyRole([4, 5]), addEmploye);

employesRouter.put("/", verifiyRole([4,2, 5]) ,updateEmploye);

employesRouter.post("/asing", verifiyRole([2,4,5]), asingComputer)

employesRouter.post("/reasing", verifiyRole([2,4,5]),reasingComputer)


export default employesRouter;
