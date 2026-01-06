import add from "../src/utils/add";

describe("First Testing", () => {
  it("should return the sum of two numbers", () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });
});
