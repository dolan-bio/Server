import * as passport from "passport";
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;

export class LinkedInPassportWrapper {

    public fetch(): void {
        passport.use(new LinkedInStrategy({
            clientID: "77jha1j50zl7wa",
            clientSecret: "0fTpTGXQz8LiqHwo",
            callbackURL: "http://localhost:9000/linkedin/callback",
            scope: ['r_basicprofile'],
            state: true,
        }, (accessToken, refreshToken, profile, done) => {
            console.log(accessToken);
            console.log(profile);
            return done(null, profile);
        }));
    }
}
