import { Router } from "express";
import {
  addConsumer,
  deleteUser,
  getConsumer,
  getConsumers,
  updateConsumer,
} from "../Controllers/consumers.js";
import { verifiyRole, verifyAuth } from "../Middleweres/auth.js";
const consumersRouter = Router();

consumersRouter.get("/", verifyAuth, verifiyRole([2,3,4,5]) , getConsumers);

consumersRouter.get("/:id",verifyAuth, verifiyRole([2,3,4,5]), getConsumer);

consumersRouter.post("/", addConsumer);

consumersRouter.put("/",verifyAuth, verifiyRole([2,3,4,5]), updateConsumer);

consumersRouter.delete("/:id",verifyAuth, verifiyRole([2,3,4,5]), deleteUser);

export default consumersRouter;
