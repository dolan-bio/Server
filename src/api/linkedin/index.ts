import { Request, Response, Router } from "express";
import * as passport from "passport";
import * as request from "request";
import * as logger from "winston";
//import { LinkedInPassportWrapper } from "./passport";
import { ProfileFetcher } from "./profile-fetcher";

export class LinkedInRouter {
    public router: Router;
    //private passportWrapper: LinkedInPassportWrapper;
    private profileFetcher: ProfileFetcher;

    constructor(private apiKey: string) {
        this.router = Router();
        this.init();
        //this.passportWrapper = new LinkedInPassportWrapper();
        //this.passportWrapper.fetch();
        this.profileFetcher = new ProfileFetcher("77jha1j50zl7wa", "0fTpTGXQz8LiqHwo");
    }

    public init(): void {
        this.router.get("/test", (req: Request, res: Response) => {
            this.profileFetcher.connect(res);
        });

        this.router.get("/", (req: Request, res: Response) => {
            request.get({
                uri: 'http://localhost:9000/connect/linkedin2',
                headers: {
                    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.90 Safari/537.36',
                    //cookie: 'datr=...; lu=...; p=-2; c_user=...; fr=...; xs=...; ...'
                },
                jar: request.jar(),
                json: true,
                followAllRedirects: true,
            }, function (err, ress, body) {
                if (err) console.log(err)
                console.log(body);
                res.send(body);
            })
        });

        this.router.get("/login", passport.authenticate('linkedin'), (req: Request, res: Response) => {
            // The request will be redirected to LinkedIn for authentication, so this 
            // function will not be called.
        });

        this.router.get("/callback", passport.authenticate('linkedin', {
            successRedirect: '/',
            failureRedirect: '/'
        }));
    }
}
