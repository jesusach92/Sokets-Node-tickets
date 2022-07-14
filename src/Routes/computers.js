import { Router } from "express";
import { addComputer, deleteComputer, getComputer, getComputers, updateComputer } from "../Controllers/computers.js";
import { verifiyRole, verifyAuth } from "../Middleweres/auth.js";

const ComputerRouter = Router();

ComputerRouter.get("/",verifyAuth, verifiyRole([3,4,5]) ,getComputers)

ComputerRouter.get("/:id",verifyAuth, verifiyRole([2,3,4,5]),getComputer)

ComputerRouter.post("/",verifyAuth, verifiyRole([3,4,5]), addComputer)

ComputerRouter.put("/",verifyAuth, verifiyRole([3,4,5]),updateComputer)

ComputerRouter.delete("/:id",verifyAuth, verifiyRole([3,4,5]), deleteComputer)

export default ComputerRouter;