import { Router } from "express";
import { addAgent, deleteAgent, getAgent, getAgents, updateAgent } from "../Controllers/agent.js";
const agentRouter = Router();

agentRouter.get("/", getAgents)

agentRouter.get("/:id", getAgent)

agentRouter.post("/", addAgent)

agentRouter.put("/", updateAgent)

agentRouter.delete("/:id",deleteAgent)

export default agentRouter

