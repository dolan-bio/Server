import { Request, Response, Router } from "express";
import * as GitHubApi from "github";
import * as logger from "winston";
import { ContributionsFetcher } from "./contributions-fetcher";
import { EventsFetcher } from "./events-fetcher";

export class GitHubRouter {
    public router: Router;
    private eventsFetcher: EventsFetcher;
    private profileFetcher: ContributionsFetcher;

    constructor(config: IConfig) {
        this.router = Router();
        this.init();
        const github = new GitHubApi({
            debug: true,
        });

        github.authenticate({
            type: "token",
            token: config.github.token,
        });

        this.eventsFetcher = new EventsFetcher(github);
        this.profileFetcher = new ContributionsFetcher();
    }

    public init(): void {
        this.router.get("/event", (req: Request, res: Response) => {
            logger.debug("Getting latest event");
            this.eventsFetcher.WhenFetchedLastEvent.subscribe((data) => {
                res.status(200).json(data);
            });
        });

        this.router.get("/profile", (req: Request, res: Response) => {
            logger.debug("Getting profile");
            this.profileFetcher.WhenFetchedContributions.subscribe((data) => {
                res.status(200).json(data);
            });
        });
    }
}
