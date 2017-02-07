import { Request, Response, Router } from "express";
import * as passport from "passport";
import * as request from "request";
import * as logger from "winston";
import { LinkedInPassportWrapper } from "../../passport/linkedin";
import { ProfileFetcher } from "./profile-fetcher";
var phantom = require("phantom");

const CLIENT_ID = "77jha1j50zl7wa";
const SECRET = "0fTpTGXQz8LiqHwo";

export class LinkedInRouter {
    public router: Router;
    private passportWrapper: LinkedInPassportWrapper;
    private profileFetcher: ProfileFetcher;

    constructor(private apiKey: string) {
        this.router = Router();
        this.init();
        this.passportWrapper = new LinkedInPassportWrapper();
        this.passportWrapper.fetch();
        this.profileFetcher = new ProfileFetcher("77jha1j50zl7wa", "0fTpTGXQz8LiqHwo");
    }

    public init(): void {
        this.router.get("/test", (req: Request, res: Response) => {
            this.profileFetcher.connect(res);
        });

        this.router.get("/passport", (req: Request, res: Response) => {
            console.log(req);
            passport.authenticate('linkedin')(req, res, function () {
                res.send('cool bro');
            })
        });

        this.router.get("/phantom", (req: Request, res: Response) => {
            var _ph, _page, _outObj;

            phantom.create().then(ph => {
                _ph = ph;
                return _ph.createPage();
            }).then(page => {
                _page = page;
                // return _page.open(`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost:9000%2Flinkedin%2Fcallback&state=987654321&scope=r_basicprofile`);
                // return _page.open(`http://localhost:9000/connect/linkedin2`);
                page.property('onResourceReceived', function (resource) {
                    /*if (url == resource.url && resource.redirectURL) {
                        redirectURL = resource.redirectURL;
                    }*/
                    console.log(resource.url);
                    console.log(resource.redirectURL);
                });

                return _page.open(`http://localhost:9000/linkedin/login`);
            }).then(status => {
                console.log(status);
                return _page.property('content')
            }).then(content => {
                // console.log(content);
                _page.evaluate(function () {
                    window.console.log = function (msg) { alert(msg) };

                    console.log('Clicked');
                    // find element to send click to
                    var element = document.getElementsByName('authorize')[0];
                    console.log(element);
                    window.console.log(element);
                    // create a mouse click event
                    var event = document.createEvent('MouseEvents');
                    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);

                    // send click to element
                    element.dispatchEvent(event);
                    // _page.close();
                    // _ph.exit();
                });

            }).catch(e => console.log(e));
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
            res.status(200).send('done');
        });

        this.router.get("/callback", (req: Request, res: Response) => {
            console.log('authenticated');
            console.log(req.query.code);
            res.status(200);
        });
    }
}
