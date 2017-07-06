import { Request, Response, Router } from "express";
import * as logger from "winston";

import { Observable } from "rxjs/Rx";
import { ImageFetcher } from "./image-fetcher";
import { SkillsFetcher } from "./skill-fetcher";

export class SkillsRouter {
    public router: Router;
    private skillsFetcher: SkillsFetcher;
    private imageFetcher: ImageFetcher;
    private combinedObservable: Observable<any>;

    constructor(config: IConfig) {
        this.router = Router();
        this.skillsFetcher = new SkillsFetcher(config.googleSearch);
        this.imageFetcher = new ImageFetcher(config.googleSearch);

        this.combinedObservable = this.skillsFetcher.WhenFetchedSkills.flatMap((skills) => {
            const observables: Observable<any>[] = [];
            skills.forEach((skill) => {
                observables.push(this.imageFetcher.findImage(skill.name).map((image) => {
                    return {
                        image: image,
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
