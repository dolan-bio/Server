
import * as cheerio from "cheerio";
import * as request from "request";
import { Observable } from "rxjs/Rx";

import { ISummaryDocument, Summary } from "./github-rank-summary-model";

export class RankFetcher {
    private rank$: Observable<number>;

    constructor() {
        const summary$ = Observable.fromPromise<ISummaryDocument>(Summary.findOne().sort("-created_at").sort("-created_at"));
        const contributions$ = this.fetchContributions("dolanmiu");

        this.rank$ = Observable.forkJoin(summary$, contributions$, (summary, contributions) => {
            return { summary, contributions };
        }).map((data) => {
            return this.getRank(data.summary, data.contributions);
        });
    }

    public get Rank$(): Observable<number> {
        return this.rank$;
    }

    private getRank(doc: ISummaryDocument, contributions: number): number {
        const coefficient = (doc.c * doc.totalDocuments) / doc.d;
        const myExponant = Math.pow(Math.E, doc.d * contributions);
        const yMyContributions = coefficient * myExponant;

        const maxExponant = Math.pow(Math.E, doc.d * doc.contributions.highest);
        const yMaxContributions = coefficient * maxExponant;

        return Math.ceil(yMaxContributions - yMyContributions);
    }

    private fetchContributions(username: string): Observable<number> {
        const url = `https://github.com/users/${username}/contributions`;

        // tslint:disable-next-line:no-any
        const getAsObservable = Observable.bindCallback<[any, request.RequestResponse, string]>(request.get);
        return getAsObservable({
            url: url,
        }).map(([error, response, body]) => {
            // Sometimes may throw 404 error
            if (response.statusCode === 404) {
                return 0;
            }

            if (error || response.statusCode !== 200) {
                throw new Error(error);
            }

            const $ = cheerio.load(body);

            const contributions: number[] = [];

            $("rect").each(function(): void {
                const count = $(this).attr("data-count");
                contributions.push(parseInt(count, 10));
            });

            const total = contributions.reduce((a, b) => {
                return a + b;
            });

            return total;
        }).retry(2);

    }
}
