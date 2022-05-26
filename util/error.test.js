import { describe, expect, it } from "vitest";
import { HttpError, ValidationError } from "./errors";

describe("class HttpError", () => {
  it("should contain provided status code, message and data", () => {
    const testStatus = 1;
    const testMessage = "test message";
    const testData = { key: "testKeyData" };

    const testError = new HttpError(testStatus, testMessage, testData);

    expect(testError.statusCode).toBe(testStatus);
    expect(testError.message).toBe(testMessage);
    expect(testError.data).toBe(testData);
  });

  it("should contain undefined for data if no data is provided", () => {
    const testStatus = 1;
    const testMessage = "test message";

    const testHttpError = new HttpError(testStatus, testMessage);

    expect(testHttpError.statusCode).toBe(testStatus);
    expect(testHttpError.message).toBe(testMessage);
    expect(testHttpError.data).toBeUndefined();
    expect(testHttpError.data).not.toBeDefined();
  });
});

describe("class ValidationError", () => {
  it("should contain the provided message", () => {
    const testMessage = "Test Message";

    const testValidationError = new ValidationError(testMessage);

    expect(testValidationError.message).toBe(testMessage);
  });
});
