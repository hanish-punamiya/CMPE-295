import { Router } from "express";
import { notifyEmail } from "../Services/notification.js";

const router = Router();

router.get("/sendemail", notifyEmail);

export default router;
