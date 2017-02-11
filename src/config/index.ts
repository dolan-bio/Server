export enum EnvironmentType {
    Development, Production, Test,
}

export class Config implements IConfig {
    public port = process.env.PORT || 9000;
    public baseUrl = process.env.BASE_URL || `http://localhost:${this.port}`;
}
