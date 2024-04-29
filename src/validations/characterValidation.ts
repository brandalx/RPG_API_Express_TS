//validations for character controllers
import { jobStats } from "@/data";
import { CreateCharacterDto } from "@/dto";
import { AlljobNames } from "@/utils/extractAllJobs";
import Joi from "joi";

export function validateCharacterCreationData(_reqBody: CreateCharacterDto) {
  const joiSchema = Joi.object({
    name: Joi.string().min(1).max(20).required(),
    job: Joi.string()
      .valid(...AlljobNames)
      .required(),
  });

  return joiSchema.validate(_reqBody);
}
