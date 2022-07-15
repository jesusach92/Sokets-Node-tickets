import { Router } from "express";
import { addTicket, deleteTicket, getTicket, getTicketByAgent, getTicketByUser, getTickets, putTicket } from "../Controllers/tickets.js";

const ticketsRouter = Router()

ticketsRouter.get("/", getTickets)

ticketsRouter.get("/:id", getTicket)

ticketsRouter.get("/agent/:id", getTicketByAgent)

ticketsRouter.get("/user/:id", getTicketByUser)

ticketsRouter.post("/", addTicket)

ticketsRouter.put("/", putTicket)

ticketsRouter.delete("/:id", deleteTicket)


export default ticketsRouter