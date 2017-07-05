export const DevelopmentConfig: IConfig = {
    port: process.env.PORT || 9000,
    baseUrl: `http://localhost:${this.port}`,
    mongoUri: process.env.MONGO_URI || "mongodb://heroku_5tsndblw:rqkr1r8osglir0oqj4hk57j89g@ds113938.mlab.com:13938/heroku_5tsndblw",
    linkedIn: {
        clientId: process.env.LINKED_IN_CLIENT_ID,
        secret: process.env.LINKED_IN_SECRET,
        email: process.env.LINKED_IN_EMAIL,
        password: process.env.LINKED_IN_PASSWORD,
    },
    github: {
        token: process.env.GITHUB_TOKEN || "c374562df9fb9b9121ebc9d64e49523df90e3ff8",
    },
};
