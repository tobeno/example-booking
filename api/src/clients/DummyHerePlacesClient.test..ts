import nock from "nock";
import responseBrowse from "./__fixtures__/here-places/responses/browse.json";
import DummyHerePlacesClient from "./DummyHerePlacesClient";

describe("DummyHerePlacesClient", (): void => {
  const client = new DummyHerePlacesClient();

  it("browses location", async (): Promise<void> => {
    const scope = nock("http://example.com")
      .get("/browse")
      .query({
        at: "48.1366,11.5771",
        cat: "hotel,accommodation",
        size: "2",
        // eslint-disable-next-line @typescript-eslint/camelcase
        app_id: "my-id",
        // eslint-disable-next-line @typescript-eslint/camelcase
        app_code: "my-code",
        tf: "plain",
      })
      .reply(200, responseBrowse);

    const items = await client.browse(
      "48.1366,11.5771",
      ["hotel", "accommodation"],
      2,
    );

    expect(items.length).toBe(2);
    expect(items[0]).toMatchObject({
      id: expect.any(String),
      title: expect.any(String),
      distance: expect.any(Number),
      vicinity: expect.any(String),
    });

    scope.done();
  });
});
