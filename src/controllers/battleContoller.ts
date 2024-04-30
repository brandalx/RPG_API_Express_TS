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
  //check if selected attacker character is dead already or his hp too low to play
  if (!attacker.isAlive || attacker.hp <= 0) {
    return res.status(500).json({
      message: `Character ${attacker.name} cannot attend tot his fight because his HP too low `,
    });
  }
  //check if selected defender character is dead already or his hp too low to play

  if (!defender.isAlive || defender.hp <= 0) {
    return res.status(500).json({
      message: `Character ${defender.name} cannot attend tot his fight because his HP too low `,
    });
  }
  //check if selected attacker  id  is the same as defender id (cannot play against himself)
  if (defender.id === attacker.id) {
    return res.status(500).json({
      message: `Character cannot play against himself. Please select or create different character and try again `,
    });
  }

  // begin battle log and round counter
  let log = `Battle between ${attacker.name} (${attacker.job}) - ${attacker.hp} HP and ${defender.name} (${defender.job}) - ${defender.hp} HP begins!\n`;
  let round = 1;
  let first, second;

  // loop battle until one characters hp drops to 0 or  less
  while (true) {
    let attackerSpeedRoll = Math.random() * attacker.speedModifier;
    let defenderSpeedRoll = Math.random() * defender.speedModifier;

    // select who attacks first with  a random speed comparison formula
    if (attackerSpeedRoll > defenderSpeedRoll) {
      first = attacker;
      second = defender;
      //console whos the first round is gonna be
      log += `${attacker.name}'s speed (${attackerSpeedRoll.toFixed(
        2
      )}) was faster than ${defender.name}'s (${defenderSpeedRoll.toFixed(
        2
      )}) and will begin this round.\n`;
      break;
    } else if (attackerSpeedRoll < defenderSpeedRoll) {
      first = defender;
      second = attacker;
      log += `${defender.name}'s speed (${defenderSpeedRoll.toFixed(
        2
      )}) was faster than ${attacker.name}'s (${attackerSpeedRoll.toFixed(
        2
      )}) and will begin this round.\n`;
      break;
    }
    // in case of a draw, the loop continues without logging
  }
  //battle logic
  while (attacker.hp > 0 && defender.hp > 0) {
    // console the current round and who is attacking whom
    log += `Round ${round}: ${first.name} attacks ${second.name}.\n`;
    let damage = Math.floor(Math.random() * first.attackModifier);
    second.hp -= damage;
    second.hp = Math.max(second.hp, 0); /// ensure hP does not go negative
    // console damage dealt and remaining HP
    log += `${first.name} deals ${damage} damage to ${second.name}. ${second.name} has ${second.hp} HP remaining.\n`;

    // checK if the defender is defeated
    if (second.hp <= 0) {
      log += `${first.name} wins the battle! ${first.name} still has ${first.hp} HP remaining!\n`;
      first.isAlive = true;
      second.isAlive = false;
      break; //exit from loop
    }

    // Swap roles for the next attack
    [first, second] = [second, first];
    round++;
  }

  // log  final result and send return
  console.log(log);
  res.json({
    message: "Battle finished",
    log,
    winner: first.isAlive ? first : second,
    loser: !first.isAlive ? first : second,
  });
};
