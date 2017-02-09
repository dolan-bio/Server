declare module "passport-linkedin-oauth2" {
    import * as passport from "passport";

    export var Strategy: any;

    export interface LinkedInAuthenticateOptions extends passport.AuthenticateOptions {
        state?: string;
    }
}