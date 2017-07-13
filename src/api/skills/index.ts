import { Request, Response, Router } from "express";
import * as request from "request";
import * as logger from "winston";

import { Observable } from "rxjs/Rx";
import { ImageFetcher } from "./image-fetcher";
import { SkillsFetcher } from "./skill-fetcher";
import { ISkillDocument } from "./skill-model";

interface ISkillCombinedResult {
    image: GoogleImageResult;
    document: ISkillDocument;
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

        this.combinedObservable = this.skillsFetcher.WhenFetchedSkills.flatMap((skills) => {
            const observables: Observable<ISkillCombinedResult>[] = [];
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
            }).flatMap((image) => {
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
            }).subscribe((base64) => {
                res.status(200).send(base64);
            });
        });
    }
}
