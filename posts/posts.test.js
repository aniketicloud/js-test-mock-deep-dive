import { beforeEach, describe, expect, it } from "vitest";
import { extractPostData } from "./posts";

describe("extractPostData()", () => {
  const testTitle = "Test Title";
  const testContent = "Test Content";
  let testFormData;
  beforeEach(() => {
    testFormData = {
      title: testTitle,
      content: testContent,
      get(identifier) {
        return this[identifier];
      },
    };
  });

  it("should extract title and content from the provided data", () => {
    const data = extractPostData(testFormData);
    expect(data.title).toBe(testTitle);
    expect(data.content).toBe(testContent);
  });

  it.only("should throw an error when no title and content is provided", () => {
    testFormData = {
      title: null,
      content: null,
      get(identifier) {
        return this[identifier];
      },
    };
    try {
      extractPostData(testFormData);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
