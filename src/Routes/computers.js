import { Router } from "express";
import { addComputer, deleteComputer, getComputer, getComputers, updateComputer } from "../Controllers/computers.js";
import { verifiyRole,} from "../Middleweres/auth.js";

const ComputerRouter = Router();

ComputerRouter.get("/", verifiyRole([2,3,4,5]) ,getComputers)

ComputerRouter.get("/:id", verifiyRole([2,3,4,5]),getComputer)

ComputerRouter.post("/", verifiyRole([2,3,4,5]), addComputer)

ComputerRouter.put("/", verifiyRole([4,5]),updateComputer)

ComputerRouter.delete("/:id", verifiyRole([4,5]), deleteComputer)

export default ComputerRouter;