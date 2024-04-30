// characterRouter.js
import express from "express";
import {
  createCharacter,
  getCharacterById,
  getCharacters,
} from "@/controllers";
const router = express.Router();

/**
 * @openapi
 * /api/characters:
 *   get:
 *     tags:
 *       - Character
 *     summary: Retrieve a list of characters
 *     responses:
 *       200:
 *         description: A list of characters
 */
router.get("/", getCharacters);

/**
 * @openapi
 * /api/characters/{id}:
 *   get:
 *     tags:
 *       - Character
 *     summary: Retrieve a character by ID
 *     parameters:
 *     - in: path
 *       name: id
 *       schema:
 *         type: string
 *       required: true
 *       description: Unique ID of the character to retrieve
 *     responses:
 *       200:
 *         description: A single character
 *       404:
 *         description: Character not found
 */
router.get("/:id", getCharacterById);

/**
 * @openapi
 * /api/characters:
 *   post:
 *     tags:
 *       - Character
 *     summary: Create a new character
 *     requestBody:
 *       required: true
 *     responses:
 *       201:
 *         description: Character created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post("/", createCharacter);

export default router;
