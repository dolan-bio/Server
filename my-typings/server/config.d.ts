interface GoogleSearchConfig {
    customSearchEngineId: string;
    apiKey: string;
}

interface IConfig {
    port: string | number;
    baseUrl: string;
    mongoUri: string;
    github: {
        token: string,
    };
    googleSearch: GoogleSearchConfig;
}
