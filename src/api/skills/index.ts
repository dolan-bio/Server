import { Request, Response, Router } from "express";
import * as logger from "winston";

import { SkillsFetcher } from "./skill-fetcher";

export class SkillsRouter {
    public router: Router;
    private skillsFetcher: SkillsFetcher;

    constructor(config: IConfig) {
        this.router = Router();
        this.skillsFetcher = new SkillsFetcher();

        this.init();
    }

    public init(): void {
        this.router.get("/", (req: Request, res: Response) => {
            logger.debug("Getting skills");
            this.skillsFetcher.WhenFetchedSkills.subscribe((data) => {
                res.status(200).send(data);
            }, (err) => {
                logger.error(err);
                const errorResponse = {
                    message: "Something went wrong with the server",
                };
                res.status(500).send(errorResponse);
            });
        });
    }
}
