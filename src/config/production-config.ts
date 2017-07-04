export const ProductionConfig: IConfig = {
    port: process.env.PORT || 9000,
    baseUrl: process.env.BASE_URL,
    mongoUri: process.env.MONGO_URI,
    linkedIn: {
        clientId: process.env.LINKED_IN_CLIENT_ID,
        secret: process.env.LINKED_IN_SECRET,
        email: process.env.LINKED_IN_EMAIL,
        password: process.env.LINKED_IN_PASSWORD,
    },
    github: {
        token: process.env.GITHUB_TOKEN,
    },
};