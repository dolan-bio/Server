import { Request, Response, Router } from "express";
import * as logger from "winston";

import { ExperiencesFetcher } from "./experiences-fetcher";

export class ExperiencesRouter {
    public router: Router;
    private experiencesFetcher: ExperiencesFetcher;

    constructor(config: IConfig) {
        this.router = Router();
        this.experiencesFetcher = new ExperiencesFetcher();

        this.init();
    }

    public init(): void {
        this.router.get("/", (req: Request, res: Response) => {
            logger.debug("Getting experiences");
            this.experiencesFetcher.WhenFetchedExperiences.subscribe((data) => {
                res.status(200).send(data);
            }, (err) => {
                logger.error(err);
                const errorResponse: ServerError = {
                    message: "Something went wrong with the server",
                };
                res.status(500).send(errorResponse);
            });
        });
    }
}
