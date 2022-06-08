import { Router } from "express";
import { logOut, RefreshToken, singCtrl } from "../Controllers/auth";
const router = Router();

/* A route that is being created. */
router.post("/login", singCtrl);

router.get("/Update", RefreshToken);

module.exports = router;
