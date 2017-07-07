import * as mongoose from "mongoose";
import * as logger from "winston";

import { CvRouter } from "./api/cv";
import { EducationsRouter } from "./api/educations";
import { ExperiencesRouter } from "./api/experiences";
import { GitHubRouter } from "./api/github";
import { LinkedInRouter } from "./api/linkedin";
import { ProjectsRouter } from "./api/projects";
import { SkillsRouter } from "./api/skills";
import { TipsRouter } from "./api/tips";
import { ApplicationWrapper } from "./bootstrap/application-wrapper";
import { DevelopmentConfig, ProductionConfig } from "./config";

const config = process.env.NODE_ENV === undefined || process.env.NODE_ENV === "dev" ? DevelopmentConfig : ProductionConfig;

(mongoose as PromiseMongoose).Promise = global.Promise;
mongoose.connect(config.mongoUri);

const appWrapper = new ApplicationWrapper(config);

appWrapper.configure((app) => {
    logger.debug("Configuring application routes");
    app.use("/linkedin", new LinkedInRouter(config).router);
    app.use("/github", new GitHubRouter(config).router);
    app.use("/skills", new SkillsRouter(config).router);
    app.use("/experiences", new ExperiencesRouter(config).router);
    app.use("/educations", new EducationsRouter(config).router);
    app.use("/projects", new ProjectsRouter(config).router);
    app.use("/cv", new CvRouter(config).router);
    app.use("/tips", new TipsRouter(config).router);
});

appWrapper.start();
