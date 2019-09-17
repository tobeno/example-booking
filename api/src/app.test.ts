import request, { Response } from "supertest";
import nock from "nock";
import { createApp } from "./app";
import { herePlacesClient } from "./services";

describe("App", (): void => {
  beforeEach((): void => {
    // Ensure CI version of HERE API is used
    herePlacesClient.baseUrl = "https://places.cit.api.here.com/places/v1";
    nock.disableNetConnect();
    nock.enableNetConnect(/^(127\.0\.0\.1|places\.cit\.api\.here\.com)\b/);
  });

  afterEach((): void => {
    nock.enableNetConnect();
  });

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
    });
  });

  it("handles /v1/properties requests", async (): Promise<void> => {
    const response = await request(createApp())
      .get("/v1/properties?at=48.1366,11.5771")
      .expect("Content-Type", /^application\/json/)
      .expect(200);

    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
    });
  });
});
