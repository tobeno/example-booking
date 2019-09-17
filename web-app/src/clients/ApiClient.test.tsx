import ApiClient from "./ApiClient";

describe("ApiClient", (): void => {
  const client = new ApiClient("http://example.com");

  afterEach((): void => {
    fetchMock.resetMocks();
  });

  it("gets properties", async (): Promise<void> => {
    fetchMock.mockResponseOnce(
      JSON.stringify([{ id: "hotelbeach", name: "Hotel at the beach" }]),
    );

    const properties = await client.getProperties("48.1366,11.5771");

    expect(properties.length).toBe(1);
    expect(fetchMock.mock.calls.length).toBe(1);
    expect(fetchMock.mock.calls[0][0]).toBe(
      "http://example.com/properties?at=48.1366%2C11.5771",
    );
  });
});
