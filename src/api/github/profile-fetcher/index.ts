import * as GitHubApi from "github";
import * as logger from "winston";

export class ProfileFetcher {
    constructor(private github: GitHubApi) {
    }

    public fetch(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.github.users.getById({
                id: "2917613",
            }, (err, res) => {
                if (err !== null) {
                    logger.error(err.stack);
                    reject(err);
                    return;
                }

                resolve(res);
            });
        });

    }
}
