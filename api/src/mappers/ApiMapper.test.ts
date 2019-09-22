import ApiMapper from "./ApiMapper";
import { createModel, Model } from "../model";
import { createTestConnection } from "../utils/test/model";
import { Connection } from "mongoose";

describe("ApiMapper", (): void => {
  let apiMapper: ApiMapper;
  let connection: Connection;
  let model: Model;

  beforeAll(
    async (): Promise<void> => {
      connection = await createTestConnection();
      model = createModel(connection);
      apiMapper = new ApiMapper(model);
    },
  );

  afterAll(
    async (): Promise<void> => {
      await connection.close();
    },
  );

  it("maps property", (): void => {
    const property = {
      id: "hotelbeach",
      title: "Hotel at the beach",
      distance: 10,
      vicinity: "Somestreet 12\n12345 Anywhere",
      href: "http://example.com/hotelbeach",
    };

    expect(apiMapper.mapProperty(property)).toEqual({
      id: "hotelbeach",
      name: "Hotel at the beach",
      distance: 10,
      location: "Somestreet 12\n12345 Anywhere",
    });
  });

  it("maps user", (): void => {
    const user = new model.User({
      name: "joe",
    });

    expect(apiMapper.mapUser(user)).toEqual({
      id: user.id,
      name: "joe",
    });
  });

  it("maps booking", (): void => {
    const user = new model.User({
      name: "joe",
    });

    const booking = new model.Booking({
      propertyId: "hotelbeach",
      propertyName: "Hotel at the beach",
      propertyLocation: "Anywhere",
      user,
    });

    expect(apiMapper.mapBooking(booking)).toEqual({
      id: booking.id,
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_id: "hotelbeach",
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_name: "Hotel at the beach",
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_location: "Anywhere",
      user: {
        id: user.id,
        name: "joe",
      },
    });
  });

  it("maps API user", (): void => {
    const apiUser = {
      name: "joe",
    };

    expect(apiMapper.mapApiUser(apiUser)).toMatchObject({
      name: "joe",
    });
  });

  it("maps API booking", (): void => {
    const apiBooking = {
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_id: "hotelbeach",
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_name: "Hotel at the beach",
      // eslint-disable-next-line @typescript-eslint/camelcase
      property_location: "Anywhere",
      user: {
        name: "joe",
      },
    };

    expect(apiMapper.mapApiBooking(apiBooking)).toMatchObject({
      propertyId: "hotelbeach",
      propertyName: "Hotel at the beach",
      propertyLocation: "Anywhere",
      user: {
        name: "joe",
      },
    });
  });
});
