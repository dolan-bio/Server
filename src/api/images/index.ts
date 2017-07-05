import { Request, Response, Router } from "express";
import * as logger from "winston";

import { ImageFetcher } from "./image-fetcher";

export class ImagesRouter {
    public router: Router;
    private imageFetcher: ImageFetcher;

    constructor(config: IConfig) {
        this.router = Router();
        this.imageFetcher = new ImageFetcher(config.googleSearch);
        this.init();
    }

    public init(): void {
        this.router.get("/", (req: Request, res: Response) => {
            logger.debug("Getting images");
            this.imageFetcher.findImage("angular").subscribe((images) => {
                console.log(images);
                res.status(200).send(images);
            }, (err) => {
                console.log(err);
                logger.error(err);
                const errorResponse: ServerError = {
                    message: "Something went wrong with the server",
                };
                res.status(500).send(errorResponse);
            });
        });
    }
}
