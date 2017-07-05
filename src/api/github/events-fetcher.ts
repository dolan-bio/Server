import * as GitHubApi from "github";
import { Observable } from "rxjs/Rx";
import * as logger from "winston";

export class EventsFetcher {
    public whenFetchedLastEvent: Observable<GitHubEvent>;

    constructor(private github: GitHubApi) {
        const getAsObservable = Observable.bindCallback<[Error, GitHubEventsResponse]>(this.github.activity.getEventsForUserPublic);
        this.whenFetchedLastEvent = getAsObservable({
            username: "dolanmiu",
        }).map(([err, res]) => {
            return res.data[0];
        });
    }

    public get WhenFetchedLastEvent(): Observable<GitHubEvent> {
        logger.debug("Getting events Observable");
        return this.whenFetchedLastEvent;
    }
}
