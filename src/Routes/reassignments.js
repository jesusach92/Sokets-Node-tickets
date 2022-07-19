import { Router } from "express";
import { addReassignment, getreassignment, getreassignments } from "../Controllers/reassignments.js";
import {verifiyRole} from "../Middleweres/auth.js"
const reassignmentRouter = Router();

reassignmentRouter.use("/", verifiyRole([4,5]))

reassignmentRouter.get("/", getreassignments)

reassignmentRouter.get("/:id", getreassignment)

reassignmentRouter.post("/", addReassignment)

reassignmentRouter.put("/",)

reassignmentRouter.delete("/:id",)

export default reassignmentRouter
