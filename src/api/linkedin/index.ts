import { Request, Response, Router } from "express";
import * as logger from "winston";
import { ProfileFetcher } from "./profile-fetcher";

export class LinkedInRouter {
    public router: Router;
    private profileFetcher: ProfileFetcher;

    constructor(config: IConfig) {
        this.router = Router();
        this.init();
        this.profileFetcher = new ProfileFetcher(this.router, config);
    }

    public init(): void {
        this.router.get("/test", (req: Request, res: Response) => {
            this.profileFetcher.connect();
        });
    }
}
