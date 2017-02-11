import * as GitHubApi from "github";
import * as logger from "winston";

export class EventsFetcher {

    constructor(private github: GitHubApi) {
    }

    public fetch(): Promise<any> {
        return new Promise<any>((resolve) => {
            this.github.activity.getEventsForUserPublic({
                username: "dolanmiu",
            }, (err, res) => {
                logger.debug("fetched events");
                resolve(res);
            });
        });
    }
}
