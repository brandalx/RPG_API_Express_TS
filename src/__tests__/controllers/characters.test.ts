import { Request, Response } from "express";
import {
  createCharacter,
  getCharacterById,
} from "@/controllers/charactersController";
import { validateCharacterCreationData } from "@/validations";
import { generateCharacter } from "@/utils";
import { getCharacters } from "@/controllers/charactersController";
//import for jest mock
import * as characterData from "@/data";

//todo: move mocks into their folder
// Mocks for validation and character generation functions

//mock for data creation validation
jest.mock("@/validations", () => ({
  validateCharacterCreationData: jest.fn(),
}));

//mock for generate utility function
jest.mock("@/utils", () => ({
  generateCharacter: jest.fn(),
}));

//mock data for characters for getting a list of characters
jest.mock("@/data", () => ({
  characters: {
    "1": { id: "1", name: "john1", job: "Warrior" },
    "2": { id: "2", name: "john2", job: "Mage" },
  },
}));

//test suites
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

  // test for creation of character with 201 response
  it("should create character and return 201 on successful creation", () => {
    (validateCharacterCreationData as jest.Mock).mockReturnValue({
      error: null,
    });
    (generateCharacter as jest.Mock).mockReturnValue({
      id: "123",
      name: "John",
      job: "Warrior",
    });
    const req = mockRequest({ name: "John", job: "Warrior" });
    const res = mockResponse();
    createCharacter(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Character created successfully",
      character: { id: "123", name: "John", job: "Warrior" },
    });
  });
  // test for handling generic error

  it("should handle errors during character generation", () => {
    const errorMessage = "Failed to generate character";
    (validateCharacterCreationData as jest.Mock).mockReturnValue({
      error: null,
    });
    (generateCharacter as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });
    const req = mockRequest({ name: "John", job: "Warrior" });
    const res = mockResponse();
    createCharacter(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Failed to create character",
      error: errorMessage,
    });
  });
});

//test suite for getting list of characters
describe("getCharacters Controller", () => {
  //mock request and response objects
  const mockRequest = {} as Request;
  const mockResponse = () => {
    const res: any = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res as Response;
  };
  // test to handle return a list of mocked characters via get characters controller
  it("should return  array of  characters", () => {
    const req = mockRequest;
    const res = mockResponse();
    getCharacters(req, res);

    expect(res.json).toHaveBeenCalledWith([
      { id: "1", name: "john1", job: "Warrior" },
      { id: "2", name: "john2", job: "Mage" },
    ]);
  });
});

//test suite for get character by id Controller
describe("getCharacterById Controller", () => {
  //  create a mock request with params passed
  const mockRequest = (params: { id: string }): Request =>
    ({
      params,
    } as unknown as Request);

  // create mock response
  const mockResponse = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res as Response;
  };

  // test for reTrieving a character by id
  it("should return the  character if exists", () => {
    const req = mockRequest({ id: "1" }); //if character with id 1 exist
    const res = mockResponse();
    getCharacterById(req, res);

    expect(res.json).toHaveBeenCalledWith(characterData.characters["1"]);
    expect(res.status).not.toHaveBeenCalledWith(404);
  });

  //test for handling case where character does not exist
  it("should return 404 if character does not exist", () => {
    const req = mockRequest({ id: "sdsdsdsdsw" }); // not valid character id
    const res = mockResponse();
    getCharacterById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Character not found." });
  });
});
