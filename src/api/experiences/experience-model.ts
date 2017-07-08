import * as mongoose from "mongoose";

export interface IExperienceDate {
    month: number;
    year: number;
}

export interface IExperienceDocument extends mongoose.Document {
    isCurrent: boolean;
    summary: string;
    title: string;
    endDate: IExperienceDate;
    startDate: IExperienceDate;
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

export const Experience = mongoose.model<IExperienceDocument>("Experience", ExperienceSchema);
