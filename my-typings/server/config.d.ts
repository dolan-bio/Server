declare interface IConfig {
    port: number;
    baseUrl: string;
    mongoUri: string;
    linkedIn: {
        clientId: string,
        secret: string,
        email: string,
        password: string,
    };
}