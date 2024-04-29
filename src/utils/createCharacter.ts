import { Character } from "@/models";
import { generateUniqueId } from "./createUniqueId";
import { characters, jobStats } from "@/data";

export function generateCharacter(name: string, job: string): Character {
  const id = generateUniqueId();
  const newCharacter = new Character(id, name, job, jobStats);
  characters[id] = newCharacter;
  return newCharacter;
}
