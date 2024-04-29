import { Request, Response } from "express-serve-static-core";

export const getCharacters = (req: Request, res: Response) => {
  res.send("Controller get characters works");
};

export const getCharacterById = (req: Request, res: Response) => {
  res.send("Controller get character by id works");
};

export const CreateCharacters = (req: Request, res: Response) => {
  res.send("Controller create character works");
};
