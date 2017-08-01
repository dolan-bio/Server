import * as GoogleImages from "google-images";
import { Observable } from "rxjs/Rx";

export class ImageFetcher {
    private googleImageClient: GoogleImages;
    private observables: Map<string, Observable<GoogleImages.Image>>;

    constructor(config: GoogleSearchConfig) {
        this.googleImageClient = new GoogleImages(config.customSearchEngineId, config.apiKey);
        this.observables = new Map<string, Observable<GoogleImages.Image>>();
    }

    public findImage(searchTerm: string): Observable<GoogleImages.Image> {
        if (this.observables.has(searchTerm)) {
            return this.observables.get(searchTerm);
        }

        const observable = Observable.fromPromise<GoogleImages.Image[]>(this.googleImageClient.search(`${searchTerm} logo transparent`, {
            size: "medium",
        })).map((images) => {
            console.log(images[0]);
            return images[0];
        }).retry();

        this.observables.set(searchTerm, observable);

        return observable;
    }
}
