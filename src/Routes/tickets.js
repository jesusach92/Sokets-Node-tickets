import { Router } from "express";
import { addTicket, deleteTicket, getTicket, getTicketByAgent, getTicketByArea, getTicketByUser, getTickets, putTicket } from "../Controllers/tickets.js";
import { verifiyRole } from "../Middleweres/auth.js";

const ticketsRouter = Router()

ticketsRouter.get("/user/:id", getTicketByUser)

ticketsRouter.get("/", verifiyRole([2,3,4,5]),getTickets)

ticketsRouter.get("/:id",verifiyRole([2,3,4,5]),getTicket)

ticketsRouter.get("/agent/:id",verifiyRole([2,3,4,5]), getTicketByAgent)

ticketsRouter.get("/area/:id",verifiyRole([2,3,4,5]), getTicketByArea)

ticketsRouter.post("/", addTicket)

ticketsRouter.put("/", putTicket)

ticketsRouter.delete("/:id",verifiyRole([2,3,4,5]), deleteTicket)


export default ticketsRouter