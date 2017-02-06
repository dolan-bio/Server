import { Request, Response, Router } from "express";
import * as request from "request";
import * as logger from "winston";

export class GrantRouter {
    public router: Router;

    constructor(private apiKey: string) {
        this.router = Router();
        this.init();
    }

    public init(): void {
        this.router.get("/", (req: Request, res: Response) => {

        });

        this.router.get("/linkedin2/callback", (req: Request, res: Response) => {
            console.log(req.query);
        });
    }
}
