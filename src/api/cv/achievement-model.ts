import * as mongoose from "mongoose";

interface IAchievementDocument extends mongoose.Document {
    issuer?: string;
    name: string;
}

const AchievementSchema = new mongoose.Schema({
    issuer: String,
    name: String,
});

const Achievement = mongoose.model<IAchievementDocument>("Achievement", AchievementSchema);

export { Achievement, IAchievementDocument };
