import request, { Response } from "supertest";
import { createApp } from "./app";

describe("App", (): void => {
  it("creates app", (): void => {
    createApp();
  });

  it("handles static requests", async (): Promise<Response> => {
    return request(createApp())
      .get("/schema.yaml")
      .expect("Content-Type", /^text\/yaml/)
      .expect(200);
  });

  it("handles test requests", async (): Promise<Response> => {
    return request(createApp())
      .get("/test")
      .expect("Content-Type", /^application\/json/)
      .expect(200);
  });
});
