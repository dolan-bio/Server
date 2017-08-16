import { Request, Response, Router } from "express";
import * as request from "request";
import * as logger from "winston";

import { Observable } from "rxjs/Rx";
import { ImageFetcher } from "./image-fetcher";
import { SkillsFetcher } from "./skill-fetcher";

interface ISkillCombinedResult {
    image: string;
    name: string;
}

export class SkillsRouter {
    public router: Router;
    private skillsFetcher: SkillsFetcher;
    private imageFetcher: ImageFetcher;
    private combinedObservable: Observable<ISkillCombinedResult[]>;

    constructor(config: IConfig) {
        this.router = Router();
        this.skillsFetcher = new SkillsFetcher();
        this.imageFetcher = new ImageFetcher(config.googleSearch);

        this.combinedObservable = this.skillsFetcher.Skills$.flatMap((skills) => {
            const observables: Observable<ISkillCombinedResult>[] = [];
            skills.forEach((skill) => {
                observables.push(this.imageFetcher.findImage(skill.name).flatMap((image) => {
                    const getAsObservable = Observable.bindCallback<[Error, request.RequestResponse, Buffer]>(request.get);
                    return getAsObservable({
                        url: image.url,
                        encoding: null,
                    }).map(([err, response, body]) => {
                        const type = response.headers["content-type"];
                        const prefix = "data:" + type + ";base64,";
                        const base64 = body.toString("base64");
                        return prefix + base64;
                    });
                }).map((base64) => {
                    return {
                        image: base64,
                        name: skill.name,
                    };
                }));
            });
            return Observable.forkJoin(observables);
        });

        this.init();
    }

    public init(): void {
        this.router.get("/", (req: Request, res: Response) => {
            logger.debug("Getting skills");

            this.combinedObservable.subscribe((data) => {
                res.status(200).send(data);
            }, (err) => {
                logger.error(err);
                const errorResponse: ServerError = {
                    message: "Something went wrong with the server",
                };
                res.status(500).send(errorResponse);
            });
        });
    }
}
