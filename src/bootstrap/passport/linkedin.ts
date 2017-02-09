import * as passport from "passport";
import { Strategy } from "passport-linkedin-oauth2";
import * as logger from "winston";

export class LinkedInPassportLoader {

    public load(clientId: string, secret: string): void {
        passport.use(new Strategy({
            clientID: clientId,
            clientSecret: secret,
            callbackURL: "/linkedin/callback",
            scope: ["r_basicprofile"],
        }, (accessToken, refreshToken, profile, done) => {
            logger.info(profile);
            return done(null, profile);
        }));
    }
}
