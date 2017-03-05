// import * as LinkedIn from "node-linkedin";
import { Router } from "express";
import * as logger from "winston";
import { AccessTokenManager } from "./access-token/access-token-manager";
const LinkedIn = require("node-linkedin")();

export class ProfileFetcher {
    private accessTokenManager: AccessTokenManager;
    private accessTokenPromise: Promise<string>;

    constructor(router: Router, config: IConfig) {
        this.accessTokenManager = new AccessTokenManager(router, config);
        this.accessTokenPromise = this.accessTokenManager.fetch();
    }

    public connect(): Promise<LinkedInProfile> {
        return new Promise<LinkedInProfile>((resolve, reject) => {
            this.accessTokenPromise.then((accessToken) => {
                logger.info(`accessToken: ${accessToken}`);
                const linkedin = LinkedIn.init(accessToken);
                linkedin.people.me((err, profile) => {
                    if (err) {
                        logger.error(err);
                        reject(err);
                        return;
                    }
                    resolve(profile);
                });
            });
        });
    }
}
