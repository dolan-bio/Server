// import * as LinkedIn from "node-linkedin";
import { Response } from "express";
var LinkedIn = require('node-linkedin')("77jha1j50zl7wa", "0fTpTGXQz8LiqHwo", "http://localhost:9000/linkedin/callback");

const SCOPE = ['r_basicprofile'];

export class ProfileFetcher {

    constructor(appId: string, secret: string) {
        //LinkedIn(appId, secret, "http://localhost:9000/linkedin/callback");
    }

    public connect(res: Response): void {
        console.log(LinkedIn);
        const authUrl = LinkedIn.auth.authorize(SCOPE);
        console.log(authUrl);
        res.redirect(authUrl);
    }

    public callback(code: string, state: string): void {
        LinkedIn.auth.getAccessToken(code, state, (err, results) => {
            if (err) {
                return console.error(err);
            }

            /**
             * Results have something like:
             * {"expires_in":5184000,"access_token":". . . ."}
             */

            console.log(results);
            return;
        });
    }
}
