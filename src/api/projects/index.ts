import { Request, Response, Router } from "express";
import * as logger from "winston";

import { ProjectsFetcher } from "./projects-fetcher";

export class ProjectsRouter {
    public router: Router;
    private projectsFetcher: ProjectsFetcher;

    constructor(config: IConfig) {
        this.router = Router();
        this.projectsFetcher = new ProjectsFetcher();

        this.init();
    }

    public init(): void {
        this.router.get("/", (req: Request, res: Response) => {
            logger.debug("Getting projects");
            this.projectsFetcher.Projects$.subscribe((data) => {
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
