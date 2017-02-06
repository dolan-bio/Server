import { Request, Response, Router } from "express";
import * as passport from "passport";
import * as request from "request";
import * as logger from "winston";
import { LinkedInPassportWrapper } from "../../passport/linkedin";
const phantom = require('phantom');

export class LinkedInRouter {
    public router: Router;
    private passportWrapper: LinkedInPassportWrapper;

    constructor(private apiKey: string) {
        this.router = Router();
        this.init();
        this.passportWrapper = new LinkedInPassportWrapper();
        this.passportWrapper.fetch();
    }

    public init(): void {
        this.router.get("/", (req: Request, res: Response) => {
            var _ph, _page, _outObj;
            phantom.create().then(ph => {
                _ph = ph;
                return _ph.createPage();
            }).then(page => {
                _page = page;
                return _page.open('http://localhost:9000/linkedin/login');
            }).then(status => {
                console.log(status);
                return _page.property('content')
            }).then(content => {
                res.send(content);
                _page.close();
                _ph.exit();
            }).catch(e => console.log(e));
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
