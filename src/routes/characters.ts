//character routes
import express from "express";
import {
  CreateCharacters,
  getCharacterById,
  getCharacters,
} from "@/controllers";
const router = express.Router();
router.get("/", getCharacters);
router.get("/:id", getCharacterById);
router.post("/", CreateCharacters);

export default router;
