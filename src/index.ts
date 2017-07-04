import * as mongoose from "mongoose";
import * as logger from "winston";
import { GitHubRouter } from "./api/github";
import { LinkedInRouter } from "./api/linkedin";
import { ApplicationWrapper } from "./bootstrap/application-wrapper";
import { LinkedInPassportLoader } from "./bootstrap/passport/linkedin";
import { DevelopmentConfig, ProductionConfig } from "./config";

const config = process.env.NODE_ENV === undefined || process.env.NODE_ENV === "dev" ? DevelopmentConfig : ProductionConfig;

(mongoose as PromiseMongoose).Promise = global.Promise;
const linkedInPassport = new LinkedInPassportLoader();
linkedInPassport.load(config.linkedIn.clientId, config.linkedIn.secret);
mongoose.connect(config.mongoUri);

const appWrapper = new ApplicationWrapper(config);

appWrapper.configure((app) => {
    logger.debug("Configuring application routes");
    app.use("/linkedin", new LinkedInRouter(config).router);
    app.use("/github", new GitHubRouter(config).router);
});

appWrapper.start();
