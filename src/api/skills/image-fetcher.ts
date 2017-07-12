import * as GoogleImages from "google-images";
import { Observable } from "rxjs/Rx";

export class ImageFetcher {
    private googleImageClient: GoogleImages;
    private observables: Map<string, Observable<any>>;

    constructor(config: GoogleSearchConfig) {
        this.googleImageClient = new GoogleImages(config.customSearchEngineId, config.apiKey);
        this.observables = new Map<string, Observable<any>>();
    }

    public findImage(searchTerm: string): Observable<any> {
        if (this.observables.has(searchTerm)) {
            return this.observables.get(searchTerm);
        }

        const observable = Observable.fromPromise(this.googleImageClient.search(`${searchTerm} logo transparent`, {
            size: "medium",
        })).map((images) => {
            return images[0];
        }).retry();

        this.observables.set(searchTerm, observable);

        return observable;
    }
}
