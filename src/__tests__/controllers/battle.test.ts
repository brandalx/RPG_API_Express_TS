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

describe("beginBattle Controller", () => {
  //  request and response mock
  const mockRequest = (body: any): Request<any, any, any> =>
    ({
      body,
    } as Request<any, any, any>);
  const mockResponse = (): Response => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  // invalid data input test
  it("should return 400 for invalid request data", () => {
    const req = mockRequest({ attackerId: "", defenderId: "" });
    const res = mockResponse();
    (validateBattleIncomingData as jest.Mock).mockReturnValue({
      error: { details: [{ message: "Invalid input" }] },
    });
    beginBattle(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid input" });
  });

  //test for non-existing characters
  it("should return 404 if one or both characters do not exist", () => {
    const req = mockRequest({
      attackerId: "sdfssfd",
      defenderId: "sdfswasdwads",
    });
    const res = mockResponse();
    (validateBattleIncomingData as jest.Mock).mockReturnValue({ error: null });
    beginBattle(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "One or both characters not found.",
    });
  });
});
