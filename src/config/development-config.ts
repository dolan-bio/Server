export const DevelopmentConfig: IConfig = {
    port: process.env.PORT || 9000,
    baseUrl: `http://localhost:${this.port}`,
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