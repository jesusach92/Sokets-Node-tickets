import { Router } from "express";
import { Logout, logOut, RefreshToken, singCtrl } from "../Controllers/auth";
const router = Router();

/* A route that is being created. */
router.post("/login", singCtrl);

router.get("/Update", RefreshToken);

router.put("/logout",Logout)

module.exports = router;
