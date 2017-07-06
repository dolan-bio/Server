import * as docx from "docx";

export class DocumentCreator {

    public create(): docx.Document {
        const document = new docx.Document();

        return document;
    }
}
