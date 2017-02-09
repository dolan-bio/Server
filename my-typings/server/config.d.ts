declare interface IConfig {
    port: number;
    baseUrl: string;
    linkedIn: {
        clientId: string,
        secret: string,
        email: string,
        password: string,
    };
}