import { Router } from "express";
import { addUser, deleteUser, getUser, getUsers, updateUser } from "../Controllers/userController";
const router = Router();

router.get("/", getUsers);

router.get("/:id", getUser);

router.post("/", addUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;