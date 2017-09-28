interface GoogleSearchConfig {
    customSearchEngineId: string;
    apiKey: string;
}

interface IConfig {
    port: string | number;
    mongoUri: string;
    github: {
        token: string,
    };
    googleSearch: GoogleSearchConfig;
}
