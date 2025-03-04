//character controller - all handlers for character controll
import { CreateCharacterDto } from "@/dto";
import { ErrorResponse, SuccessResponse } from "@/interfaces/Response";
import { Character } from "@/models";
import { generateCharacter } from "@/utils";
import { validateCharacterCreationData } from "@/validations";
import { Request, Response } from "express-serve-static-core";
import { characters } from "@/data";

//controller to get list if all characters
export const getCharacters = (req: Request, res: Response): void => {
  const allCharacters: Character[] = Object.values(characters);
  res.json(allCharacters);
};
//controller to get character info by passsed id
export const getCharacterById = (req: Request, res: Response): void => {
  const { id } = req.params; //id extraction from params
  const character = characters[id]; //attemp to find by passed id

  if (character) {
    res.json(character); //if exist returns found character
  } else {
    res.status(404).json({ message: "Character not found." }); //404 if not exist
  }
};
//controller to create new character from passed data
export const createCharacter = (
  req: Request<{}, {}, CreateCharacterDto>,
  res: Response<SuccessResponse | ErrorResponse>
) => {
  const { name, job } = req.body;
  if (!name || !job) {
    return res.status(400).json({ message: "Name and job are required." });
  }
  // Validate the request body via Joi
  const { error } = validateCharacterCreationData(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newCharacter = generateCharacter(name, job);
    newCharacter.speedModifier = parseFloat(
      newCharacter.speedModifier.toFixed(2)
    ); //precision of speed modifier to two decimal places when creating character
    return res.status(201).json({
      message: "Character created successfully",
      character: newCharacter,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create character",
      //@ts-ignore
      error: error.message,
    });
  }
};
