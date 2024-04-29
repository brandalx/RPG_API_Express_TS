//character routes
import express from "express";
import { test } from "@/controllers";
const router = express.Router();
router.get("/", test);

export default router;
