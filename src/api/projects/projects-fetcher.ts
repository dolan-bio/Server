import { Observable } from "rxjs/Rx";
import * as logger from "winston";

import { IProjectDocument, Project } from "./project-model";

export class ProjectsFetcher {
    private projects$: Observable<IProjectDocument[]>;

    constructor() {
        this.projects$ = Observable.fromPromise<IProjectDocument[]>(Project.find());
    }

    public get Projects$(): Observable<IProjectDocument[]> {
        logger.debug("Getting projects Observable");
        return this.projects$;
    }
}
