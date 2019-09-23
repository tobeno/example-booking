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
      await connection.dropDatabase();
      await connection.close();
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
      propertyLocation: "Anywhere",
      date: new Date("2019-09-01"),
      nights: 1,
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
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_location: "Anywhere",
      date: "2019-09-01T00:00:00.000Z",
      nights: 1,
      user: {
        id: expect.any(String),
        name: "joe",
      },
    });
  });

  it("handles GET /v1/properties/:propertyId/bookings requests", async (): Promise<
    void
  > => {
    const user = new services.model.User({ name: "joe" });
    await user.save();

    const booking = new services.model.Booking({
      propertyId: "hotelshore",
      propertyName: "Hotel at the shore",
      propertyLocation: "Anywhere",
      date: new Date("2019-09-01"),
      nights: 1,
      user,
    });
    await booking.save();

    const otherBooking = new services.model.Booking({
      propertyId: "hotelcity",
      propertyName: "Hotel in the city",
      propertyLocation: "Anywhere",
      date: new Date("2019-09-01"),
      nights: 1,
      user,
    });
    await otherBooking.save();

    const response = await request(app)
      .get("/v1/properties/hotelshore/bookings")
      .expect("Content-Type", /^application\/json/);

    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0]).toMatchObject({
      id: expect.any(String),
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_id: "hotelshore",
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_name: "Hotel at the shore",
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_location: "Anywhere",
      date: "2019-09-01T00:00:00.000Z",
      nights: 1,
      user: {
        id: expect.any(String),
        name: "joe",
      },
    });
  });

  it("handles GET /v1/users/:userId/bookings requests", async (): Promise<
    void
  > => {
    const user = new services.model.User({ name: "joe" });
    await user.save();

    const otherUser = new services.model.User({ name: "jane" });
    await otherUser.save();

    const booking = new services.model.Booking({
      propertyId: "hotelstreet",
      propertyName: "Hotel at the street",
      propertyLocation: "Anywhere",
      date: new Date("2019-09-01"),
      nights: 1,
      user,
    });
    await booking.save();

    const otherBooking = new services.model.Booking({
      propertyId: "hotelstreet",
      propertyName: "Hotel at the street",
      propertyLocation: "Anywhere",
      date: new Date("2019-09-01"),
      nights: 1,
      user: otherUser,
    });
    await otherBooking.save();

    const response = await request(app)
      .get(`/v1/users/${user.id}/bookings`)
      .expect("Content-Type", /^application\/json/);

    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toBeInstanceOf(Array);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0]).toMatchObject({
      id: expect.any(String),
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_id: "hotelstreet",
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_name: "Hotel at the street",
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_location: "Anywhere",
      date: "2019-09-01T00:00:00.000Z",
      nights: 1,
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
        // eslint-disable-next-line @typescript-eslint/camelcase
        property_location: "Anywhere",
        date: "2019-09-01T00:00:00.000Z",
        nights: 1,
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
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_location: "Anywhere",
      date: "2019-09-01T00:00:00.000Z",
      nights: 1,
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
        // eslint-disable-next-line @typescript-eslint/camelcase
        property_location: "Anywhere",
        date: "2019-09-01T00:00:00.000Z",
        nights: 1,
      })
      .expect("Content-Type", /^application\/json/)
      .expect(500);

    expect(response.body).toMatchObject({
      status: 500,
      message: expect.any(String),
    });
  });
});
