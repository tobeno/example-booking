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

  it("handles unknown requests", async (): Promise<void> => {
    const response = await request(createApp())
      .get("/notexisting")
      .expect("Content-Type", /^application\/json/)
      .expect(404);

    expect(response.body).toMatchObject({
      status: 404,
      message: expect.any(String),
    })
  });
});
