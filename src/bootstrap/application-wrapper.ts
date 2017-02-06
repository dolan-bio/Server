import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as express from "express";
import * as session from "express-session";
import * as http from "http";
import * as morgan from "morgan";
import * as path from "path";
import * as logger from "winston";

const Grant = require('grant-express');
const grant = new Grant({
    "server": {
        "protocol": "http",
        "host": "localhost:9000",
        "state": true,
    },
    "linkedin2": {
        "key": "77jha1j50zl7wa",
        "secret": "0fTpTGXQz8LiqHwo",
        "scope": ['r_basicprofile'],
    },
});

import { EnvironmentType, IConfig } from "../config";

export class ApplicationWrapper {
    private app: express.Application;
    private server: http.Server;

    constructor(private config: IConfig) {
        this.app = express();

        this.app.use(compression());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());

        this.app.set("appPath", path.join("", "client"));
        this.app.use(morgan("dev"));
        this.app.use(express.static(this.app.get("appPath")));
        this.app.use(session({ secret: "grant" }));
        this.app.use(grant);

        this.server = http.createServer(this.app);
    }

    public start(callback: () => void = () => null): void {
        this.server.listen(this.config.port, () => {
            logger.info(`Express server listening on ${this.config.port}, in ${process.env.NODE_ENV} mode`);
            callback();
        });
    }

    public configure(func: (app: express.Application) => void = () => null): void {
        func(this.app);
    }

    get Server(): http.Server {
        return this.server;
    }
}
