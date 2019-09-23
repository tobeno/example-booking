import { createModel, Model } from "./index";
import { createTestConnection } from "../utils/test/model";
import { Connection } from "mongoose";

describe("Model", (): void => {
  let connection: Connection;
  let model: Model;

  beforeAll(
    async (): Promise<void> => {
      connection = await createTestConnection();
      model = createModel(connection);
    },
  );

  afterAll(
    async (): Promise<void> => {
      await connection.close();
    },
  );

  describe("Booking", (): void => {
    it("supports valid data", async (): Promise<void> => {
      const booking = new model.Booking({
        propertyId: "hotelbeach",
        propertyName: "Hotel at the beach",
        propertyLocation: "Anywhere",
        date: new Date("2019-09-01"),
        nights: 1,
        user: new model.User({
          name: "joe",
        }),
      });

      await booking.validate();
    });
  });

  describe("User", (): void => {
    it("supports valid data", async (): Promise<void> => {
      const user = new model.User({
        name: "joe",
      });

      await user.validate();
    });
  });
});
