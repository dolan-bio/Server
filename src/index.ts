import * as logger from "winston";
import { GrantRouter } from "./api/grant";
import { LinkedInRouter } from "./api/linkedin";
import { ApplicationWrapper } from "./bootstrap/application-wrapper";
import { Config, IConfig } from "./config/index";

const config: IConfig = new Config();

const appWrapper = new ApplicationWrapper(config);

appWrapper.configure((app) => {
    logger.info("Configuring application routes");
    app.use("/linkedin", new LinkedInRouter(config.apiKey).router);
    app.use("/connect", new GrantRouter(config.apiKey).router);
});

appWrapper.start();
