import { Request, Response } from "express";
import { beginBattle } from "@/controllers";
import { characters } from "@/data";
import { validateBattleIncomingData } from "@/validations";

// data mock and validation functions
//validatins
jest.mock("@/validations", () => ({
  validateBattleIncomingData: jest.fn(),
}));
//data
jest.mock("@/data", () => ({
  characters: {
    "b7044d1a-c4e5-456f-9f2e-aad31222fe96": {
      id: "b7044d1a-c4e5-456f-9f2e-aad31222fe96",
      name: "Attacker",
      job: "Warrior",
      hp: 10,
      isAlive: true,
      attackModifier: 5,
      speedModifier: 1.5,
    },
    "49dc9432-d912-4251-b80b-740a00a85d07": {
      id: "49dc9432-d912-4251-b80b-740a00a85d07",
      name: "Defender",
      job: "Mage",
      hp: 8,
      isAlive: true,
      attackModifier: 3,
      speedModifier: 1.2,
    },
    "dead-character-id": {
      id: "dead-character-id",
      name: "Dead",
      job: "Thief",
      hp: 0,
      isAlive: false,
      attackModifier: 2,
      speedModifier: 1.0,
    },
  },
}));
