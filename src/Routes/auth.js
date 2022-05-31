import { Router } from "express";
import { logOut, singCtrl } from "../Controllers/auth";
const router = Router();

router.post("/login", singCtrl);



module.exports = router;
