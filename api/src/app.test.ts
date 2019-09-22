import request, { Response } from "supertest";
import nock from "nock";
import { createApp } from "./app";
import { Services } from "./services";
import { Application } from "express";
import HerePlacesClient from "./clients/HerePlacesClient";
import { createModel } from "./model";
import { createTestConnection } from "./utils/test/model";
import ApiMapper from "./mappers/ApiMapper";
import { Connection } from "mongoose";

describe("App", (): void => {
  let services: Services;
  let connection: Connection;
  let app: Application;

  beforeEach(
    async (): Promise<void> => {
      nock.disableNetConnect();
      nock.enableNetConnect(/^(127\.0\.0\.1|places\.cit\.api\.here\.com)\b/);

      const herePlacesAppId = process.env.APP_HERE_PLACES_APP_ID;
      const herePlacesAppCode = process.env.APP_HERE_PLACES_APP_CODE;
      if (!herePlacesAppId || !herePlacesAppCode) {
        throw new Error(
          "APP_HERE_PLACES_APP_ID or APP_HERE_PLACES_APP_CODE is not defined.",
        );
      }

      connection = await createTestConnection();
      const model = createModel(connection);

      services = {
        herePlacesClient: new HerePlacesClient(
          "https://places.cit.api.here.com/places/v1",
          herePlacesAppId,
          herePlacesAppCode,
        ),
        model,
        apiMapper: new ApiMapper(model),
      };

      app = createApp(services);
    },
  );

  afterEach(
    async (): Promise<void> => {
      connection.close();
      nock.enableNetConnect();
    },
  );

  it("handles static requests", async (): Promise<Response> => {
    return request(app)
      .get("/schema.yaml")
      .expect("Content-Type", /^text\/yaml/)
      .expect(200);
  });

  it("handles unknown requests", async (): Promise<void> => {
    const response = await request(app)
      .get("/notexisting")
      .expect("Content-Type", /^application\/json/)
      .expect(404);

    expect(response.body).toMatchObject({
      status: 404,
      message: expect.any(String),
    });
  });

  it("handles GET /v1/properties requests", async (): Promise<void> => {
    const response = await request(app)
      .get("/v1/properties?at=48.1366,11.5771")
      .expect("Content-Type", /^application\/json/)
      .expect(200);

    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(response.body.data[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
    });
  });

  it("handles GET /v1/bookings requests", async (): Promise<void> => {
    const user = new services.model.User({ name: "joe" });
    await user.save();

    const booking = new services.model.Booking({
      propertyId: "hotelbeach",
      propertyName: "Hotel at the beach",
      city: "Anywhere",
      user,
    });
    await booking.save();

    const response = await request(app)
      .get("/v1/bookings")
      .expect("Content-Type", /^application\/json/);

    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0]).toMatchObject({
      id: expect.any(String),
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_id: "hotelbeach",
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_name: "Hotel at the beach",
      user: {
        id: expect.any(String),
        name: "joe",
      },
    });
  });

  it("handles POST /v1/bookings requests", async (): Promise<void> => {
    const response = await request(app)
      .post("/v1/bookings")
      .send({
        // eslint-disable-next-line @typescript-eslint/camelcase
        property_id: "hotelbeach",
        // eslint-disable-next-line @typescript-eslint/camelcase
        property_name: "Hotel at the beach",
        city: "Anywhere",
        user: {
          name: "joe",
        },
      })
      .expect("Content-Type", /^application\/json/)
      .expect(200);

    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toMatchObject({
      id: expect.any(String),
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_id: "hotelbeach",
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_name: "Hotel at the beach",
      user: {
        id: expect.any(String),
        name: "joe",
      },
    });
  });

  it("handles POST /v1/bookings requests without user", async (): Promise<
    void
  > => {
    const response = await request(app)
      .post("/v1/bookings")
      .send({
        // eslint-disable-next-line @typescript-eslint/camelcase
        property_id: "hotelbeach",
        // eslint-disable-next-line @typescript-eslint/camelcase
        property_name: "Hotel at the beach",
        city: "Anywhere",
      })
      .expect("Content-Type", /^application\/json/)
      .expect(500);

    expect(response.body).toMatchObject({
      status: 500,
      message: expect.any(String),
    });
  });
});
