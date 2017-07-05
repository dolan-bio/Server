declare interface GoogleSearchConfig {
    customSearchEngineId: string;
    apiKey: string;
}

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
    googleSearch: GoogleSearchConfig;
}
