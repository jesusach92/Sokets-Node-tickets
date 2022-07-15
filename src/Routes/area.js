import { Router } from "express";
import { addArea, deleteArea, getArea, getAreas, putArea } from "../Controllers/areas.js";

const AreasRouter = Router();

AreasRouter.get("/", getAreas)

AreasRouter.get("/:id", getArea)

AreasRouter.post("/",addArea)

AreasRouter.put("/",putArea)

AreasRouter.delete("/:id",deleteArea)

export default AreasRouter;