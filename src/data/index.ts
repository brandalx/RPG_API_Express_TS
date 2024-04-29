// data storage

import { JobStatsMap } from "@/interfaces";
import { Character } from "@/models";

//character instance

// usage of an object with character id's as keys for storing character data to enable O(1) time complexity for direct access, updates, and deletions by id

export const characters: { [id: string]: Character } = {};

//job stats
export const jobStats: JobStatsMap = {
  //job stats for warrior
  Warrior: {
    attackFormula: (str, dex, int) => 0.8 * str + 0.2 * dex,
    speedFormula: (dex, int) => 0.6 * dex + 0.2 * int,
    maxHP: 20,
    strength: 10,
    dexterity: 5,
    intelligence: 5,
  },
  //job stats for thief
  Thief: {
    attackFormula: (str, dex, int) => 0.25 * str + dex + 0.25 * int,
    speedFormula: (dex, int) => 0.8 * dex,
    maxHP: 15,
    strength: 4,
    dexterity: 10,
    intelligence: 4,
  },
  //job stats for mage
  Mage: {
    attackFormula: (str, dex, int) => 0.2 * str + 0.2 * dex + 1.2 * int,
    speedFormula: (dex, str) => 0.4 * dex + 0.1 * str,
    maxHP: 12,
    strength: 5,
    dexterity: 6,
    intelligence: 10,
  },
};
