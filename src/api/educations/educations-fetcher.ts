import { Observable } from "rxjs/Rx";
import * as logger from "winston";

import { Education, IEducationDocument } from "./education-model";

export class EducationsFetcher {
    private educations$: Observable<IEducationDocument[]>;

    constructor() {
        this.educations$ = Observable.fromPromise<IEducationDocument[]>(Education.find()).map((educations) => {
            return educations.sort((a, b) => {
                if (a.endDate === undefined) {
                    return -1;
                }

                const aStartDate = new Date(a.startDate.year, 0, 1);
                const bStartDate = new Date(b.startDate.year, 0, 1);

                if (aStartDate > bStartDate) {
                    return -1;
                } else {
                    return 1;
                }
            });
        });
    }

    public get Educations$(): Observable<IEducationDocument[]> {
        logger.debug("Getting Educations Observable");
        return this.educations$;
    }
}
