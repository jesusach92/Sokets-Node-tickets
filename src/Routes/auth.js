import { Router } from "express";
import { logOut, singCtrl } from "../Controllers/auth";
const router = Router();

/* A route that is being created. */
router.post("/login", singCtrl);



module.exports = router;
