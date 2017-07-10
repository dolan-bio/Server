import { Observable } from "rxjs/Rx";
import * as logger from "winston";

import { ISkillDocument, Skill } from "./skill-model";

export class SkillsFetcher {
    private whenFetchedSkills: Observable<ISkillDocument[]>;

    constructor() {
        this.whenFetchedSkills = Observable.fromPromise<ISkillDocument[]>(Skill.find());
    }

    public get WhenFetchedSkills(): Observable<ISkillDocument[]> {
        logger.debug("Getting skills Observable");
        return this.whenFetchedSkills;
    }
}
