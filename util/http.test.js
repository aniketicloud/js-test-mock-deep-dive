import { describe, expect, it, vi } from "vitest";
import { sendDataRequest } from "./http";

describe("sendDataRequest()", () => {
  const testResponseData = { testKey: "testData" };
  const testFectch = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
      if (typeof options.body !== "string") {
        reject("data is not a string");
      }
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

  it("should convert the provied data to JSON before sending the request", async () => {
    const testData = { key: "test" };
    // return expect(sendDataRequest(testData)).not.rejects.toBe(
    //   "data is not a string"
    // );
    let errorMessage;
    try {
      await sendDataRequest(testData);
    } catch (error) {
      errorMessage = error;
    }

    expect(errorMessage).not.toBe("data is not a string");
  });
});
