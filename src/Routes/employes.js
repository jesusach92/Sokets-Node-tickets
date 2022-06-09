import { Router } from "express";
import { addEmploye, asingComputer, getEmploye, getEmployes,  reasingComputer,  updateEmploye } from "../Controllers/employes";
import { verifyAuth, verifiyRole,} from "../Middleweres/auth";

const router = Router();

router.use("/", verifyAuth)

router.get("/", verifiyRole([4,5]) , getEmployes);

router.get("/:id", verifiyRole([2, 5]), getEmploye);

router.post("/", verifiyRole([4, 5]), addEmploye);

router.put("/", verifiyRole([4,2, 5]) ,updateEmploye);

router.post("/asing", verifiyRole([2,4,5]), asingComputer)

router.post("/reasing", verifiyRole([2,4,5]),reasingComputer)


module.exports = router;
