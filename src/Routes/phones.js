import { Router } from "express";
import { addPhone, deletePhone, getPhone, getPhones, updatePhone } from "../Controllers/phones.js";
import {verifiyRole, verifySession } from "../Middleweres/auth.js";

const phonesRouter = Router()

phonesRouter.get("/",verifiyRole([2,3,4,5]) ,getPhones)
phonesRouter.get("/:id",verifiyRole([2,3,4,5]),getPhone)
phonesRouter.post("/",addPhone)
phonesRouter.put("/",updatePhone)
phonesRouter.delete("/:id",deletePhone)


export default phonesRouter