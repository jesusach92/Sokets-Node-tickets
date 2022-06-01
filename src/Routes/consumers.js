import { Router } from "express";
import {
  addConsumer,
  deleteUser,
  getConsumer,
  getConsumers,
  updateConsumer,
} from "../Controllers/consumers";
import { verifiyRole, verifyAuth } from "../Middleweres/auth";
const router = Router();

router.get("/", verifyAuth, verifiyRole([2,3,4,5]) , getConsumers);

router.get("/:id",verifyAuth, verifiyRole([2,3,4,5]), getConsumer);

router.post("/", addConsumer);

router.put("/",verifyAuth, verifiyRole([2,3,4,5]), updateConsumer);

router.delete("/:id",verifyAuth, verifiyRole([2,3,4,5]), deleteUser);

module.exports = router;
