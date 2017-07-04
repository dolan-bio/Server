declare interface IConfig {
    port: string | number;
    baseUrl: string;
    mongoUri: string;
    linkedIn: {
        clientId: string,
        secret: string,
        email: string,
        password: string,
    };
    github: {
        token: string,
    };
}