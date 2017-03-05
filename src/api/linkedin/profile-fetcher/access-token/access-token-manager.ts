import { Router } from "express";
import * as logger from "winston";
import { DbAccessTokenFetcher } from "./db-access-token-fetcher";
import { OAuthAccessTokenFetcher } from "./oauth-access-token-fetcher";

export class AccessTokenManager {
    private dbAccessTokenFetcher: DbAccessTokenFetcher;
    private oauthAccessTokenFetcher: OAuthAccessTokenFetcher;

    constructor(router: Router, config: IConfig) {
        this.dbAccessTokenFetcher = new DbAccessTokenFetcher();
        this.oauthAccessTokenFetcher = new OAuthAccessTokenFetcher(router, config);
    }

    public fetch(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.dbAccessTokenFetcher.fetch().then((token) => {
                if (token === undefined) {
                    this.oauthAccessTokenFetcher.fetch().then((accessToken) => {
                        logger.debug(`accessToken from OAuth: ${accessToken}`);

                        this.dbAccessTokenFetcher.store(accessToken);
                        resolve(accessToken);
                    }).catch((err) => {
                        logger.error(err);
                        reject(err);
                    });
                    return;
                }

                logger.debug(`accessToken from database: ${token}`);
                resolve(token);
            }).catch((err) => {
                logger.error(err);
                reject(err);
            });
        });
    }
}
