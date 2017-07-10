export const DevelopmentConfig: IConfig = {
    port: process.env.PORT || 9000,
    baseUrl: `http://localhost:${this.port}`,
    mongoUri: process.env.MONGODB_URI,
    github: {
        token: process.env.GITHUB_TOKEN,
    },
    googleSearch: {
        customSearchEngineId: process.env.GOOGLE_SEARCH_CSE_ID,
        apiKey: process.env.GOOGLE_API_KEY,
    },
};
