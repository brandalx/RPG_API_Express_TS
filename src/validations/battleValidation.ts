//validations for battle controllers

import { beginBattleDto } from "@/dto";
import Joi from "joi";

export function validateBattleIncomingData(_reqBody: beginBattleDto) {
  const joiSchema = Joi.object({
    attackerId: Joi.string().min(1).max(100).required(),
    defenderId: Joi.string().min(1).max(100).required(),
  });

  return joiSchema.validate(_reqBody);
}
