import * as request from "request";
import { Observable } from "rxjs/Rx";
import * as logger from "winston";

const CONTRIBUTION_URL = "https://opensourcecontributo.rs/api/user/dolanmiu";

export class ContributionsFetcher {
    private contributions$: Observable<ContributionStatistics>;

    constructor() {
        const getAsObservable = Observable.bindCallback<[Error, request.RequestResponse, OpenSourceContributorsResponse]>(request.get);
        this.contributions$ = getAsObservable({
            url: CONTRIBUTION_URL,
            json: true,
        }).map(([err, response, body]) => {
            return {
                contributionCount: body.eventCount,
                repoCount: body.repos.length,
                lineCount: body.eventCount * 30,
            };
        });
    }

    public get Contributions$(): Observable<ContributionStatistics> {
        logger.debug("Getting contribution Observable");
        return this.contributions$;
    }
}
