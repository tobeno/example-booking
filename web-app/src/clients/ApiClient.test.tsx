import ApiClient from "./ApiClient";

describe("ApiClient", (): void => {
  const client = new ApiClient("http://example.com");

  afterEach((): void => {
    fetchMock.resetMocks();
  });

  it("gets properties", async (): Promise<void> => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: [{ id: "hotelbeach", name: "Hotel at the beach" }],
      }),
    );

    const properties = await client.getProperties("48.1366,11.5771");

    expect(properties.length).toBe(1);
    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      "http://example.com/properties?at=48.1366%2C11.5771",
    );
  });

  it("adds booking", async (): Promise<void> => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          id: "booking-1",
          property_id: "hotelbeach",
          property_name: "Hotel at the beach",
          property_location: "Anywhere",
          user: {
            id: "user-1",
            name: "joe",
          },
        },
      }),
    );

    const booking = await client.addBooking(
      {
        id: "hotelbeach",
        name: "Hotel at the beach",
        location: "Anywhere",
        distance: 10,
      },
      {
        name: "joe",
      },
    );

    expect(booking).toHaveProperty("id");
    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe("http://example.com/bookings");
  });
});
