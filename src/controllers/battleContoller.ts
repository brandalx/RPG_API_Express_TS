//battle controller - all handlers for battle control
import { characters } from "@/data";
import { validateBattleIncomingData } from "@/validations";
import { Request, Response } from "express-serve-static-core";

export const beginBattle = (req: Request, res: Response) => {
  // get attacker and defender id from body
  const { attackerId, defenderId } = req.body;

  // check if both characters exist

  // validate the request body via Joi
  const { error } = validateBattleIncomingData(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // find attacker and defender id in character data
  let attacker = characters[attackerId];
  let defender = characters[defenderId];

  if (!attacker || !defender) {
    return res
      .status(404)
      .json({ message: "One or both characters not found." });
  }
};
