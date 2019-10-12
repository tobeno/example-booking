import HerePlacesClient, { HerePlacesResponse } from './HerePlacesClient';
import responseBrowse from './__fixtures__/here-places/responses/browse.json';

class DummyHerePlacesClient extends HerePlacesClient {
	static responses: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	} = {
		'/browse': responseBrowse
	};

	constructor() {
		super('http://localhost', 'dummy', '123');
	}

	async get(path: string): Promise<HerePlacesResponse> {
		const responseBody = DummyHerePlacesClient.responses[path];
		if (!responseBody) {
			throw new Error(`No response available for path ${path}.`);
		}

		const response: HerePlacesResponse = {
			statusCode: 200,
			body: JSON.stringify(responseBody),
			toString(): string {
				return this.body;
			}
		};

		return response;
	}
}

export default DummyHerePlacesClient;
