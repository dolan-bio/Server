import { Observable } from "rxjs/Rx";
import * as logger from "winston";

import { Experience, IExperienceDocument } from "./experience-model";

export class ExperiencesFetcher {
    private whenFetchedExperiences: Observable<IExperienceDocument[]>;

    constructor() {
        this.whenFetchedExperiences = Observable.fromPromise<IExperienceDocument[]>(Experience.find()).map((experiences) => {
            return experiences.sort((a, b) => {
                if (a.endDate === undefined) {
                    return -1;
                }

                const aStartDate = new Date(a.startDate.year, a.startDate.month - 1, 1);
                const bStartDate = new Date(b.startDate.year, b.startDate.month - 1, 1);

                if (aStartDate > bStartDate) {
                    return -1;
                } else {
                    return 1;
                }
            });
        });
    }

    public get WhenFetchedExperiences(): Observable<IExperienceDocument[]> {
        logger.debug("Getting experiences Observable");
        return this.whenFetchedExperiences;
    }
}
