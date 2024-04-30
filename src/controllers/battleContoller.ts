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
  //if not found return error
  if (!attacker || !defender) {
    return res
      .status(404)
      .json({ message: "One or both characters not found." });
  }

  // begin battle log and round counter
  let log = `battle between ${attacker.name} (${attacker.job}) - ${attacker.hp} HP and ${defender.name} (${defender.job}) - ${defender.hp} HP begins!\n`; //log
  let round = 1; //counter

  // loop battle until one characters hp drops to 0 or  less
  while (attacker.hp > 0 && defender.hp > 0) {
    let first = attacker;
    let second = defender;

    // select who attacks first with  a random speed comparison formula
    if (
      Math.random() * attacker.speedModifier <
      Math.random() * defender.speedModifier
    ) {
      first = defender;
      second = attacker;
    }

    // console the current round and who is attacking whom
    log += `Round ${round}: ${first.name} attacks ${second.name}.\n`;
    let damage = Math.floor(Math.random() * first.attackModifier);
    second.hp -= damage;
    second.hp = Math.max(second.hp, 0); // ensure hP does not go negative

    // console damage dealt and remaining HP
    log += `${first.name} deals ${damage} damage to ${second.name}. ${second.name} has ${second.hp} HP remaining.\n`;

    console.log(log);
    console.log(defender);
    console.log(attacker);
    // checK if the defender is defeated
    if (second.hp <= 0) {
      log += `${first.name} wins the battle! ${first.name} still has ${first.hp} HP remaining!\n`;
      first.isAlive = true;
      second.isAlive = false;
      break; //exit from loop
    }

    // Swap roles for the next attack
    [attacker, defender] = [defender, attacker];
    round++;
  }
};
