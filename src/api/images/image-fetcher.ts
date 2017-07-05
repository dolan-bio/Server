import * as GoogleImages from "google-images";
import { Observable } from "rxjs/Rx";

export class ImageFetcher {
    private googleImageClient: GoogleImages;

    constructor(config: GoogleSearchConfig) {
        this.googleImageClient = new GoogleImages(config.customSearchEngineId, config.apiKey);
    }

    public findImage(searchTerm: string): Observable<any> {
        return Observable.fromPromise(this.googleImageClient.search(`${searchTerm} logo transparent`, {
            size: "medium",
        }));
    }
}
