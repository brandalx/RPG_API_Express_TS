//all tests for characters controller group
import { getCharacters } from "@/controllers";
import { mockRequest, mockResponse } from "@/__mock__/index";

describe("Characters Controller", () => {
  describe("getCharacters", () => {
    it("Should return a list of characters", () => {
      getCharacters(mockRequest, mockResponse);
      expect(mockResponse.send).toHaveBeenCalledWith(
        "Controller get characters works"
      );
    });
  });
});
