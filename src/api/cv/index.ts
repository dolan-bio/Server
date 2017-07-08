import { ExpressPacker } from "docx";
import { Request, Response, Router } from "express";
import { Observable } from "rxjs/Rx";
import * as logger from "winston";

import { EducationsFetcher } from "../educations/educations-fetcher";
import { ExperiencesFetcher } from "../experiences/experiences-fetcher";
import { DocumentCreator } from "./document-creator";

export class CvRouter {
    public router: Router;
    private documentCreator: DocumentCreator;
    private educationsFetcher: EducationsFetcher;
    private experiencesFetcher: ExperiencesFetcher;

    constructor(config: IConfig) {
        this.router = Router();
        this.documentCreator = new DocumentCreator();
        this.experiencesFetcher = new ExperiencesFetcher();
        this.educationsFetcher = new EducationsFetcher();

        this.init();
    }

    public init(): void {
        this.router.get("/", (req: Request, res: Response) => {
            logger.debug("Creating CV");

            const whenFetchedData = Observable.forkJoin(this.experiencesFetcher.WhenFetchedExperiences, this.educationsFetcher.WhenFetchedEducations);

            whenFetchedData.subscribe((data) => {
                const doc = this.documentCreator.create(data);
                const expressPacker = new ExpressPacker(doc, res);
                expressPacker.pack("Dolan Miu CV");
            });
        });
    }
}
