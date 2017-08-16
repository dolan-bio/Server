import { Observable } from "rxjs/Rx";
import * as logger from "winston";

import { Achievement, IAchievementDocument } from "./achievement-model";

export class AchievementsFetcher {
    private achievements$: Observable<IAchievementDocument[]>;

    constructor() {
        this.achievements$ = Observable.fromPromise<IAchievementDocument[]>(Achievement.find());
    }

    public get Achievements$(): Observable<IAchievementDocument[]> {
        logger.debug("Getting Achievements Observable");
        return this.achievements$;
    }
}
