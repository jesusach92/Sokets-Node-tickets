import { Router } from "express";
import { addCategory, deleteCategory, getCategories, getCategoriesByArea, getCategory, putCategory } from "../Controllers/category.js";

import { verifiyRole, verifySession } from "../Middleweres/auth.js";

const CategoryRouter = Router();

CategoryRouter.get("/",getCategories)

CategoryRouter.get("/:id", verifiyRole([3,4,5]), getCategory)

CategoryRouter.get("/area/:id", getCategoriesByArea)

CategoryRouter.post("/",verifiyRole([4,5]), addCategory)

CategoryRouter.put("/", verifiyRole([4,5]), putCategory)

CategoryRouter.delete("/:id", verifiyRole([4,5]), deleteCategory)

export default CategoryRouter;