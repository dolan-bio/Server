// import * as LinkedIn from "node-linkedin";
import { Router } from "express";
import * as logger from "winston";
import { AuthCodeFetcher } from "./auth-code-fetcher";
const LinkedIn = require("node-linkedin")();

export class ProfileFetcher {
    private authCodeFetcher: AuthCodeFetcher;
    private authCodePromise: Promise<string>;

    constructor(router: Router, config: IConfig) {
        this.authCodeFetcher = new AuthCodeFetcher(router, config);
        this.authCodePromise = this.authCodeFetcher.fetch();
    }

    public connect(): void {
        this.authCodePromise.then((accessToken) => {
            logger.debug(accessToken);
            const linkedin = LinkedIn.init(accessToken);
            linkedin.people.me((err, $in) => {
                console.log($in);
            });
        });
    }
}
