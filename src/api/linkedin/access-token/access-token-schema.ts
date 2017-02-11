import * as mongoose from "mongoose";

const AccessTokenSchema = new mongoose.Schema({
    token: String,
    created: Date,
});

export interface IAccessToken extends mongoose.Document {
    token: string;
    created: Date;
};

const AccessToken = mongoose.model<IAccessToken>("AccessToken", AccessTokenSchema);
export { AccessToken }
