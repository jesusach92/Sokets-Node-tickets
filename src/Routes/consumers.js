import { Router } from "express";
import { addConsumer,deleteUser,getConsumer,getConsumers,updateConsumer} from "../Controllers/consumers.js";
import { verifiyRole, } from "../Middleweres/auth.js";
const consumersRouter = Router();

consumersRouter.get("/", verifiyRole([2, 3, 4, 5]), getConsumers);

consumersRouter.get("/:id", verifiyRole([2, 3, 4, 5]), getConsumer);

consumersRouter.post("/", verifiyRole([2, 3, 4, 5]), addConsumer);

consumersRouter.put("/", verifiyRole([2, 4, 5]), updateConsumer);

consumersRouter.delete("/:id",verifiyRole([4, 5]),deleteUser);

export default consumersRouter;
