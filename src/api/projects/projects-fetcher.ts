import { Observable } from "rxjs/Rx";
import * as logger from "winston";

import { IProjectDocument, Project } from "./project-model";

export class ProjectsFetcher {
    private whenFetchedProjects: Observable<IProjectDocument[]>;

    constructor() {
        this.whenFetchedProjects = Observable.fromPromise<IProjectDocument[]>(Project.find());
    }

    public get WhenFetchedProjects(): Observable<IProjectDocument[]> {
        logger.debug("Getting projects Observable");
        return this.whenFetchedProjects;
    }
}
