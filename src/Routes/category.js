import { Router } from "express";
import { addCategory, deleteCategory, getCategories, getCategory, putCategory } from "../Controllers/category.js";

import { verifiyRole, verifyAuth } from "../Middleweres/auth.js";

const CategoryRouter = Router();

CategoryRouter.get("/", verifyAuth, getCategories)

CategoryRouter.get("/:id",verifyAuth, verifiyRole([3,4,5]), getCategory)

CategoryRouter.post("/",verifyAuth,verifiyRole([3,4,5]), addCategory)

CategoryRouter.put("/",verifyAuth, verifiyRole([3,4,5]), putCategory)

CategoryRouter.delete("/:id",verifyAuth, verifiyRole([4,5]), deleteCategory)

export default CategoryRouter;