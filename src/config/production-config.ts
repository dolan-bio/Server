export const ProductionConfig: IConfig = {
    port: process.env.PORT || 9000,
    baseUrl: process.env.BASE_URL,
    mongoUri: process.env.MONGODB_URI,
    github: {
        token: process.env.GITHUB_TOKEN,
    },
    googleSearch: {
        customSearchEngineId: process.env.GOOGLE_SEARCH_CSE_ID,
        apiKey: process.env.GOOGLE_API_KEY,
    },
};
