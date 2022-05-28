import { describe, expect, it, vi } from "vitest";
import { sendDataRequest } from "./http";

describe("sendDataRequest()", () => {
  const testResponseData = { testKey: "testData" };
  const testFectch = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
      const testResponse = {
        ok: true,
        json() {
          return new Promise((resolve, reject) => {
            resolve(testResponseData);
          });
        },
      };
      resolve(testResponse);
    });
  });
  vi.stubGlobal("fetch", testFectch);

  it("should return any available response data", () => {
    const testData = { key: "test" };
    return expect(sendDataRequest(testData)).resolves.toEqual(testResponseData);
  });
});
