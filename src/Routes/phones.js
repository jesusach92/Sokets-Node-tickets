import { Router } from "express";
import { addPhone, deletePhone, getPhone, getPhones, updatePhone } from "../Controllers/phones.js";
import { verifyAuth } from "../Middleweres/auth.js";

const phonesRouter = Router()

phonesRouter.get("/",verifyAuth ,getPhones)
phonesRouter.get("/:id",verifyAuth ,getPhone)
phonesRouter.post("/",addPhone)
phonesRouter.put("/", verifyAuth,updatePhone)
phonesRouter.delete("/:id",verifyAuth ,deletePhone)


export default phonesRouter