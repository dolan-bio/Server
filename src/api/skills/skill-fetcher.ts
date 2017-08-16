import { Observable } from "rxjs/Rx";
import * as logger from "winston";

import { ISkillDocument, Skill } from "./skill-model";

export class SkillsFetcher {
    private skills$: Observable<ISkillDocument[]>;

    constructor() {
        this.skills$ = Observable.fromPromise<ISkillDocument[]>(Skill.find());
    }

    public get Skills$(): Observable<ISkillDocument[]> {
        logger.debug("Getting skills Observable");
        return this.skills$;
    }
}
