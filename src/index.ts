import * as logger from "winston";
import { LinkedInRouter } from "./api/linkedin";
import { ApplicationWrapper } from "./bootstrap/application-wrapper";
import { LinkedInPassportLoader } from "./bootstrap/passport/linkedin";
import { Config } from "./config/index";

const config: IConfig = new Config();
const linkedInPassport: LinkedInPassportLoader = new LinkedInPassportLoader();
linkedInPassport.load(config.linkedIn.clientId, config.linkedIn.secret);

const appWrapper = new ApplicationWrapper(config);

appWrapper.configure((app) => {
    logger.info("Configuring application routes");
    app.use("/linkedin", new LinkedInRouter(config).router);
});

appWrapper.start();
