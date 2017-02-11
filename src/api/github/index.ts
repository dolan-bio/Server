import { Request, Response, Router } from "express";
import * as GitHubApi from "github";
import * as logger from "winston";
import { EventsFetcher } from "./events-fetcher";
import { ProfileFetcher } from "./profile-fetcher";

export class GitHubRouter {
    public router: Router;
    private eventsFetcher: EventsFetcher;
    private profileFetcher: ProfileFetcher;

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
        this.profileFetcher = new ProfileFetcher(github);
    }

    public init(): void {
        this.router.get("/events", (req: Request, res: Response) => {
            logger.debug("Getting events");
            this.eventsFetcher.fetch().then((events) => {
                res.status(200).json(events);
            });
        });

        this.router.get("/profile", (req: Request, res: Response) => {
            logger.debug("Getting profile");
            this.profileFetcher.fetch().then((events) => {
                res.status(200).json(events);
            });
        });
    }
}
