import { Observable } from "rxjs/Rx";
import * as logger from "winston";

import { Achievement, IAchievementDocument } from "./achievement-model";

export class AchievementsFetcher {
    private whenFetchedAchievements: Observable<IAchievementDocument[]>;

    constructor() {
        this.whenFetchedAchievements = Observable.fromPromise<IAchievementDocument[]>(Achievement.find());
    }

    public get WhenFetchedAchievements(): Observable<IAchievementDocument[]> {
        logger.debug("Getting Achievements Observable");
        return this.whenFetchedAchievements;
    }
}
