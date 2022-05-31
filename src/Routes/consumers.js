import { Router } from "express";
import {
  addConsumer,
  deleteUser,
  getConsumer,
  getConsumers,
  updateUser,
} from "../Controllers/consumers";
import { verifyAuth } from "../Middleweres/auth";
const router = Router();

router.get("/", verifyAuth , getConsumers);

router.get("/:id", getConsumer);

router.post("/", addConsumer);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
