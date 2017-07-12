import { Request, Response, Router } from "express";
import * as request from "request";
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
        this.skillsFetcher = new SkillsFetcher();
        this.imageFetcher = new ImageFetcher(config.googleSearch);

        this.combinedObservable = this.skillsFetcher.WhenFetchedSkills.flatMap((skills) => {
            const observables: Observable<any>[] = [];
            skills.forEach((skill) => {
                observables.push(this.imageFetcher.findImage(skill.name).map((image) => {
                    return {
                        image: image,
                        document: skill,
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

        this.router.get("/:id/image", (req: Request, res: Response) => {
            const skillId = req.params.id as string;
            this.skillsFetcher.WhenFetchedSkills.map((skills) => {
                return skills.find((skill) => skill._id.toString() === skillId).name;
            }).flatMap((skillName) => {
                return this.imageFetcher.findImage(skillName);
            }).subscribe((image) => {
                request.get(image.url).pipe(res);
            });
        });
    }
}
