import { Router } from "express";
import { singCtrl } from "../Controllers/auth";
const router = Router();

router.post("/login", singCtrl);

module.exports = router;
