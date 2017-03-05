import * as moment from "moment";
import * as logger from "winston";
import { AccessToken } from "./access-token-schema";

export class DbAccessTokenFetcher {

    public fetch(): Promise<string> {
        const today = moment();
        const creationDate = moment(today).subtract(59, "days");

        return new Promise<string>((resolve, reject) => {
            AccessToken.findOne({
                created: {
                    $lt: today.toDate(),
                    $gte: creationDate.toDate(),
                },
            }).then((doc) => {
                if (doc === null) {
                    logger.info("No valid token found in database");
                    resolve(undefined);
                    return;
                }
                logger.debug(JSON.stringify(doc.toJSON()));
                resolve(doc.token);
            }).catch((error) => {
                reject(error);
            });
        });
    }

    public store(accessToken: string): Promise<void> {
        const token = new AccessToken({
            token: accessToken,
            created: new Date(),
        });

        return new Promise<void>((resolve, reject) => {
            token.save().then(() => {
                resolve();
            }).catch((error) => {
                reject();
            });
        });
    }
}
