import * as docx from "docx";

import { IEducationDocument } from "../educations/education-model";
import { IExperienceDate, IExperienceDocument } from "../experiences/experience-model";

const PHONE_NUMBER = "07595672701";
const PROFILE_URL = "https://uk.linkedin.com/dolan1";
const EMAIL = "dolan+miu@hotmail.com";

export class DocumentCreator {

    public create(data: [IExperienceDocument[], IEducationDocument[]]): docx.Document {
        const experiences = data[0];
        const educations = data[1];
        const document = new docx.Document();
        document.addParagraph(new docx.Paragraph("Dolan Miu").title());

        document.addParagraph(this.createContactInfo(PHONE_NUMBER, PROFILE_URL, EMAIL));
        document.addParagraph(this.createHeading("Education"));

        for (const education of educations) {
            document.addParagraph(this.createInstitutionHeader(education.schoolName, `${education.startDate.year} - ${education.endDate.year}`));
            document.addParagraph(this.createRoleText(`${education.fieldOfStudy} - ${education.degree}`));

            const bulletPoints = this.splitParagraphIntoBullets(education.notes);
            bulletPoints.forEach((bulletPoint) => {
                document.addParagraph(this.createBullet(bulletPoint));
            });
        }

        document.addParagraph(this.createHeading("Experience"));

        for (const position of experiences) {
            document.addParagraph(this.createInstitutionHeader(position.company.name, this.createPositionDateText(position.startDate, position.endDate, position.isCurrent)));
            document.addParagraph(this.createRoleText(position.title));

            const bulletPoints = this.splitParagraphIntoBullets(position.summary);

            bulletPoints.forEach((bulletPoint) => {
                document.addParagraph(this.createBullet(bulletPoint));
            });
        }

        document.addParagraph(this.createHeading("Skills, Achievements and Interests"));

        document.addParagraph(this.createSubHeading("Skills"));
        document.addParagraph(this.createSkillList([]));

        document.addParagraph(this.createSubHeading("Achivements"));
        document.addParagraph(this.createSubHeading("Interests"));

        document.addParagraph(this.createInterests("hello"));

        document.addParagraph(this.createHeading("References"));

        return document;
    }

    private createContactInfo(phoneNumber: string, profileUrl: string, email: string): docx.Paragraph {
        const paragraph = new docx.Paragraph().center();
        const contactInfo = new docx.TextRun(`Mobile: ${phoneNumber} | LinkedIn: ${profileUrl} | Email: ${email}`);
        const address = new docx.TextRun("Address: 58 Elm Avenue, Kent ME4 6ER, UK").break();

        paragraph.addRun(contactInfo);
        paragraph.addRun(address);

        return paragraph;

    }

    private createHeading(text: string): docx.Paragraph {
        return new docx.Paragraph(text).heading1().thematicBreak();
    }

    private createSubHeading(text: string): docx.Paragraph {
        return new docx.Paragraph(text).heading2();
    }

    private createInstitutionHeader(institutionName: string, dateText: string): docx.Paragraph {
        const paragraph = new docx.Paragraph().maxRightTabStop();
        const institution = new docx.TextRun(institutionName).bold();
        const date = new docx.TextRun(dateText).tab().bold();

        paragraph.addRun(institution);
        paragraph.addRun(date);

        return paragraph;
    }

    private createRoleText(roleText: string): docx.Paragraph {
        const paragraph = new docx.Paragraph();
        const role = new docx.TextRun(roleText).italic();

        paragraph.addRun(role);

        return paragraph;
    }

    private createBullet(text: string): docx.Paragraph {
        return new docx.Paragraph(text).bullet();
    }

    private createSkillList(skills: Skill[]): docx.Paragraph {
        const paragraph = new docx.Paragraph();
        const skillConcat = skills.join() + ".";

        paragraph.addRun(new docx.TextRun(skillConcat));

        return paragraph;
    }

    private createInterests(interests: string): docx.Paragraph {
        const paragraph = new docx.Paragraph();

        paragraph.addRun(new docx.TextRun(interests));
        return paragraph;
    }

    // private createInstitutionPair(item: string, description: string, title: string): docx.Paragraph {
    //     const paragraph = new docx.Paragraph();
    //     const titleText = new docx.TextRun(title).bold();
    //     const itemText = new docx.TextRun(item + " - ").tab();
    //     const descriptionText = new docx.TextRun(description).italic();

    //     paragraph.leftTabStop(2268);
    //     if (title !== undefined) {
    //         paragraph.addRun(titleText);
    //     }
    //     paragraph.addRun(itemText);
    //     paragraph.addRun(descriptionText);

    //     return paragraph;
    // }

    private splitParagraphIntoBullets(text: string): string[] {
        return text.split("\n\n");
    }

    private createPositionDateText(startDate: IExperienceDate, endDate: IExperienceDate, isCurrent: boolean): string {
        const startDateText = this.getMonthFromInt(startDate.month) + ". " + startDate.year;
        const endDateText = isCurrent ? "Present" : `${this.getMonthFromInt(endDate.month)}. ${endDate.year}`;

        return `${startDateText} - ${endDateText}`;
    }

    private getMonthFromInt(value: number): string {
        switch (value) {
            case 1:
                return "Jan";
            case 2:
                return "Feb";
            case 3:
                return "Mar";
            case 4:
                return "Apr";
            case 5:
                return "May";
            case 6:
                return "Jun";
            case 7:
                return "Jul";
            case 8:
                return "Aug";
            case 9:
                return "Sept";
            case 10:
                return "Oct";
            case 11:
                return "Nov";
            case 12:
                return "Dec";
        }
    }
}

// function createDocument(profile) {
//     var doc = new docx.Document({
//         creator: 'Dolan Miu',
//         description: 'A generated version of my CV from data straight from LinkedIn',
//         title: 'Dolan Miu CV'
//     }),
//         i;

//     doc.addParagraph(createTitle(profile.formattedName));
//     doc.addParagraph(createContactInfoParagraph(profile.phoneNumbers.values[0].phoneNumber, profile.publicProfileUrl, profile.emailAddress));
//     doc.addParagraph(createSection('Education'));

//     profile.educations.values.forEach(function (education) {
//         doc.addParagraph(createInstitutionHeader(education.schoolName, education.startDate.year + ' - ' + education.endDate.year));
//         doc.addParagraph(createRoleText(education.fieldOfStudy + ' - ' + education.degree));

//         var bulletPoints = utility.splitParagraphTextIntoBullets(education.notes);
//         bulletPoints.forEach(function (bulletPoint) {
//             doc.addParagraph(createBullet(bulletPoint));
//         });
//     });

//     doc.addParagraph(createSection('Experience'));

//     profile.positions.values.forEach(function (position) {
//         doc.addParagraph(createInstitutionHeader(position.company.name, utility.createPositionDateText(position.startDate, position.endDate, JSON.parse(position.isCurrent))));
//         doc.addParagraph(createRoleText(position.title));

//         var bulletPoints = utility.splitParagraphTextIntoBullets(position.summary);

//         bulletPoints.forEach(function (bulletPoint) {
//             doc.addParagraph(createBullet(bulletPoint));
//         });
//     });

//     doc.addParagraph(createSection('Skills, Achievements and Interests'));

//     doc.addParagraph(createSubSection('Skills'));

//     doc.addParagraph(createSkillList(profile.skills.values));

//     for (i = 0; i < profile.honorsAwards.values.length; i += 1) {
//         if (i === 0) {
//             doc.addParagraph(createInstitutionPair(profile.honorsAwards.values[i].issuer, profile.honorsAwards.values[i].name, 'Achievements'));
//         } else {
//             doc.addParagraph(createInstitutionPair(profile.honorsAwards.values[i].issuer, profile.honorsAwards.values[i].name));
//         }
//     }

//     for (i = 0; i < profile.volunteer.volunteerExperiences.values.length; i += 1) {
//         if (i === 0) {
//             doc.addParagraph(createInstitutionPair(profile.volunteer.volunteerExperiences.values[i].organization.name, profile.volunteer.volunteerExperiences.values[i].role, 'Volunteering'));
//         } else {
//             doc.addParagraph(createInstitutionPair(profile.volunteer.volunteerExperiences.values[i].organization.name, profile.volunteer.volunteerExperiences.values[i].role));
//         }
//     }

//     doc.addParagraph(createSubSection('Interests'));

//     doc.addParagraph(createInterests(profile.interests));

//     doc.addParagraph(createSection('References'));

//     return doc;
// }
