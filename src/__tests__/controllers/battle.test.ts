//all tests for characters controller group
import { beginBattle } from "@/controllers";
import { mockRequest, mockResponse } from "@/__mock__/index";

describe("Battle Controller", () => {
  describe("beginBattle", () => {
    it("Should begin a battle", () => {
      beginBattle(mockRequest, mockResponse);
      expect(mockResponse.send).toHaveBeenCalledWith("Controller battle works");
    });
  });
});
