import { Router } from "express";
import { addArea, deleteArea, getArea, getAreas, putArea } from "../Controllers/areas.js";
import { verifiyRole, } from "../Middleweres/auth.js";

const AreasRouter = Router();

AreasRouter.get("/", getAreas)

AreasRouter.get("/:id",verifiyRole([2,3,4,5]) , getArea)

AreasRouter.post("/",verifiyRole([4,5]), addArea)

AreasRouter.put("/",verifiyRole([4,5]), putArea)

AreasRouter.delete("/:id",verifiyRole([4,5]),deleteArea)

export default AreasRouter;