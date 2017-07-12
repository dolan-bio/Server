import * as GoogleImages from "google-images";
import { Observable } from "rxjs/Rx";

export class ImageFetcher {
    private googleImageClient: GoogleImages;
    private observables: Map<string, Observable<GoogleImageResult>>;

    constructor(config: GoogleSearchConfig) {
        this.googleImageClient = new GoogleImages(config.customSearchEngineId, config.apiKey);
        this.observables = new Map<string, Observable<GoogleImageResult>>();
    }

    public findImage(searchTerm: string): Observable<GoogleImageResult> {
        if (this.observables.has(searchTerm)) {
            return this.observables.get(searchTerm);
        }

        const observable = Observable.fromPromise<GoogleImageResult[]>(this.googleImageClient.search(`${searchTerm} logo transparent`, {
            size: "medium",
        })).map((images) => {
            return images[0];
        }).retry();

        this.observables.set(searchTerm, observable);

        return observable;
    }
}
