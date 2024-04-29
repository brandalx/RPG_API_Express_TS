import { Request, Response } from "express";
import { createCharacter } from "@/controllers/charactersController";
import { validateCharacterCreationData } from "@/validations";
import { generateCharacter } from "@/utils";

// Mocks for validation and character generation functions

jest.mock("@/validations", () => ({
  validateCharacterCreationData: jest.fn(),
}));

jest.mock("@/utils", () => ({
  generateCharacter: jest.fn(),
}));

//test suite for create character controller
describe("createCharacter Controller", () => {
  //defining mock request
  const mockRequest = (body: any): Request<any, any, any> =>
    ({
      body,
    } as Request<any, any, any>);
  //defining mock response
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };
  // test for handling requests with missing name or job props in body

  it("should return 400 if name or job is missing", () => {
    const req = mockRequest({ name: "", job: "" });
    const res = mockResponse();
    createCharacter(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Name and job are required.",
    });
  });

  // test for handling bad validation req
  it("should return 400 if validation fails", () => {
    (validateCharacterCreationData as jest.Mock).mockReturnValue({
      error: { details: [{ message: "Invalid input" }] },
    });
    const req = mockRequest({ name: "John", job: "Warrior" });
    const res = mockResponse();
    createCharacter(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid input" });
  });
});
