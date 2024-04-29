//character routes
import express from "express";
import {
  createCharacter,
  getCharacterById,
  getCharacters,
} from "@/controllers";
const router = express.Router();
router.get("/", getCharacters);
router.get("/:id", getCharacterById);
router.post("/", createCharacter);

export default router;
