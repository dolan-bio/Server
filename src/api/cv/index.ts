import { Request, Response, Router } from "express";
import * as logger from "winston";

export class CvRouter {
    public router: Router;

    constructor(config: IConfig) {
        this.router = Router();

        this.init();
    }

    public init(): void {
        this.router.get("/", (req: Request, res: Response) => {
            logger.debug("Creating CV");

        });
    }
}
