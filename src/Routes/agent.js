import { Router } from "express";
import { addAgent, deleteAgent, getAgent, getAgents, updateAgent } from "../Controllers/agent.js";
import {verifiyRole} from "../Middleweres/auth.js"
const agentRouter = Router();

agentRouter.get("/",verifiyRole([2,3,4,5]), getAgents)

agentRouter.get("/:id",verifiyRole([2,3,4,5]), getAgent)

agentRouter.post("/",verifiyRole([4,5]), addAgent)

agentRouter.put("/",verifiyRole([4,5]), updateAgent)

agentRouter.delete("/:id",verifiyRole([4,5]), deleteAgent)

export default agentRouter

