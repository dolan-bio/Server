import { Request, Response, Router } from "express";
// import * as Nightmare from "nightmare";
// import * as passport from "passport";
import * as request from "request";
import * as logger from "winston";
// import { LinkedInAuthenticateOptions } from "passport-linkedin-oauth2";

const passport = require("passport");
const Nightmare = require("nightmare");

export class AuthCodeFetcher {
    private authCode: string;
    private nightmare: any;

    constructor(router: Router, private config: IConfig) {
        this.nightmare = new Nightmare();
        router.get("/login", passport.authenticate("linkedin", { state: "dolan" }));

        router.get("/callback", (req: Request, res: Response) => {
            logger.info(req.query.code);
            this.authCode = req.query.code;
            res.status(200);
        });
    }

    public fetch(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            this.nightmare
                .goto(`${this.config.baseUrl}/linkedin/login`)
                .insert("#session_key-oauth2SAuthorizeForm", this.config.linkedIn.email)
                .insert("#session_password-oauth2SAuthorizeForm", this.config.linkedIn.password)
                .type("#session_password-oauth2SAuthorizeForm", "\u000d")
                .wait(2000)
                .end()
                .then((result) => {
                    this.fetchAccessToken(this.authCode).then((accessToken) => {
                        resolve(accessToken);
                    });
                })
                .catch((err) => {
                    logger.error(err);
                    reject(err);
                });
        });
    }

    private fetchAccessToken(code: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            request.post("https://www.linkedin.com/oauth/v2/accessToken", {
                form: {
                    grant_type: "authorization_code",
                    code: code,
                    redirect_uri: `${this.config.baseUrl}/linkedin/callback`,
                    client_id: this.config.linkedIn.clientId,
                    client_secret: this.config.linkedIn.secret,
                },
                json: true,
            }, (error, response, body: AccessTokenResponse) => {
                if (error || response.statusCode !== 200) {
                    reject(error);
                }

                resolve(body.access_token);
            });
        });
    }
}
