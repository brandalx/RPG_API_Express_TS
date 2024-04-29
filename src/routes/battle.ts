//character routes
import express from "express";
import { beginBattle } from "@/controllers";
const router = express.Router();
router.post("/", beginBattle);

export default router;
