import * as request from "request";

const linkedInUrl = "https://api.linkedin.com/v1/people/~:(id,first-name,last-name,formatted-name,summary,picture-urls::(original),public-profile-url,industry,email-address,phone-numbers,skills,educations,languages,date-of-birth,certifications,last-modified-timestamp,interests,positions,proposal-comments,associations,publications,patents,courses,volunteer,num-recommenders,recommendations-received,honors-awards)?format=json";

export class LinkedInApiWrapper {
    public fetch(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            request.post(linkedInUrl, {
                json: true,
            }, (error, response, body: AccessTokenResponse) => {
                if (error || response.statusCode !== 200) {
                    reject(error);
                }

            });
        });
    }
}
