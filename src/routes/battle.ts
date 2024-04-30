//character routes
import express from "express";
import { beginBattle } from "@/controllers";
const router = express.Router();

/**
 * @openapi
 * /api/battles:
 *   post:
 *     tags:
 *       - Battle
 *     summary: Begin a battle between two characters
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               attackerId:
 *                 type: string
 *                 description: id of the attacker
 *               defenderId:
 *                 type: string
 *                 description: ID of the defender
 *             required:
 *               - attackerId
 *               - defenderId
 *     responses:
 *       200:
 *         description: Battle executed successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: One or both characters not found
 *       500:
 *         description: Error during the battle execution
 */
router.post("/battles", beginBattle);
router.post("/", beginBattle);

export default router;
