declare interface GoogleSearchConfig {
    customSearchEngineId: string;
    apiKey: string;
}

declare interface IConfig {
    port: string | number;
    baseUrl: string;
    mongoUri: string;
    github: {
        token: string,
    };
    googleSearch: GoogleSearchConfig;
}
