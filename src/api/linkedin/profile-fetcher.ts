// import * as LinkedIn from "node-linkedin";
import { Router } from "express";
import * as logger from "winston";
import { AccessTokenManager } from "./access-token/access-token-manager";
const LinkedIn = require("node-linkedin")();

export class ProfileFetcher {
    private accessTokenManager: AccessTokenManager;
    private authCodePromise: Promise<string>;

    constructor(router: Router, config: IConfig) {
        this.accessTokenManager = new AccessTokenManager(router, config);
        this.authCodePromise = this.accessTokenManager.fetch();
    }

    public connect(): void {
        this.authCodePromise.then((accessToken) => {
            logger.info(accessToken);
            const linkedin = LinkedIn.init(accessToken);
            linkedin.people.me((err, $in) => {
                console.log($in);
            });
        });
    }
}
