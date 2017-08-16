import { Request, Response, Router } from "express";
import * as GitHubApi from "github";
import * as logger from "winston";
import { ContributionsFetcher } from "./contributions-fetcher";
import { EventsFetcher } from "./events-fetcher";
import { RankFetcher } from "./rank-fetcher";

export class GitHubRouter {
    public router: Router;
    private eventsFetcher: EventsFetcher;
    private profileFetcher: ContributionsFetcher;
    private rankFetcher: RankFetcher;

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
        this.rankFetcher = new RankFetcher();
    }

    public init(): void {
        this.router.get("/event", (req: Request, res: Response) => {
            logger.debug("Getting latest event");
            this.eventsFetcher.LastEvent$.subscribe((data) => {
                res.status(200).json(data);
            }, (err) => {
                logger.error(err);
                const errorResponse: ServerError = {
                    message: "Something went wrong with the server",
                };
                res.status(500).send(errorResponse);
            });
        });

        this.router.get("/profile", (req: Request, res: Response) => {
            logger.debug("Getting profile");
            this.profileFetcher.Contributions$.subscribe((data) => {
                res.status(200).json(data);
            }, (err) => {
                logger.error(err);
                const errorResponse: ServerError = {
                    message: "Something went wrong with the server",
                };
                res.status(500).send(errorResponse);
            });
        });

        this.router.get("/rank", (req: Request, res: Response) => {
            logger.debug("Getting rank");
            this.rankFetcher.Rank$.subscribe((data) => {
                res.status(200).json({
                    rank: data,
                });
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
