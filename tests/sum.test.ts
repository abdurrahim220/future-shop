import { sum } from "../src/app";

describe("sum function", () => {
  it("should return the sum of two numbers", () => {
    const result = sum(2, 3);
    expect(result).toBe(5);
  });
  it("should return a negative sum when both numbers are negative", () => {
    const result = sum(-2, -3);
    expect(result).toBe(-5);
  });
});
