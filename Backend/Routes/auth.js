import { Router } from "express";
import { addUser, authUser } from "../Services/user.js";

const router = Router();

router.post("/createuser", addUser);

router.post("/authuser", authUser);

export default router;
