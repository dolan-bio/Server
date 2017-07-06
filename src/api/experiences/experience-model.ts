import * as mongoose from "mongoose";

interface IExperienceDocument extends mongoose.Document {
    isCurrent: boolean;
    summary: string;
    title: string;
    endDate: {
        month: number,
        year: number,
    };
    startDate: {
        month: number,
        year: number,
    };
    company: {
        name: string,
    };
}

const ExperienceSchema = new mongoose.Schema({
    isCurrent: Boolean,
    summary: String,
    title: String,
    endDate: {
        month: Number,
        year: Number,
    },
    startDate: {
        month: Number,
        year: Number,
    },
    company: {
        name: String,
    },
});

const Experience = mongoose.model<IExperienceDocument>("Experience", ExperienceSchema);

export { Experience, IExperienceDocument };
