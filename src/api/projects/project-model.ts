import * as mongoose from "mongoose";

interface IProjectDocument extends mongoose.Document {
    imageUrl: string;
    title: string;
    description: string;
    link: string;
}

const ProjectSchema = new mongoose.Schema({
    imageUrl: String,
    title: String,
    description: String,
    link: String,
});

const Project = mongoose.model<IProjectDocument>("Project", ProjectSchema);

export { Project, IProjectDocument };
