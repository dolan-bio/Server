import * as mongoose from "mongoose";
import * as logger from "winston";
import { GitHubRouter } from "./api/github";
import { LinkedInRouter } from "./api/linkedin";
import { ApplicationWrapper } from "./bootstrap/application-wrapper";
import { LinkedInPassportLoader } from "./bootstrap/passport/linkedin";
import { Config } from "./config/index";

const config = new Config();

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
