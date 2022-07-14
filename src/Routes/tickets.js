import { Router } from "express";
import { getTickets } from "../Controllers/tickets.js";

const ticketsRouter = Router()

ticketsRouter.get("/", getTickets)

export default ticketsRouter