import express from "express";
import { output, process } from "../controllers/userController";

const router = express.Router();

router.get("/join", output.join);
router.get("/login", output.login);
router.get("/my", output.my);

router.post("/join", process.join);
router.post("/login", process.login);
router.post("/logout", process.logout);

export default router;
