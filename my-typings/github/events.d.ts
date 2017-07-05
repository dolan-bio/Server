declare type EventType = "PushEvent" | "IssueCommentEvent" | "IssuesEvent";

declare interface GitHubEvent {
    id: string,
    type: EventType,
    actor: {
        id: number,
        login: string,
        display_login: string,
        gravatar_id: string,
        url: string,
        avatar_url: string
    },
    repo: {
        id: number,
        name: string,
        url: string
    },
    payload: object,
    public: boolean,
    created_at: string,
    org: {
        id: number,
        login: string,
        gravatar_id: string,
        url: string,
        avatar_url: string
    }
}

declare interface GitHubEventsResponse {
    data: GitHubEvent[],
    meta: {
        "x-ratelimit-limit": string,
        "x-ratelimit-remaining": string,
        "x-ratelimit-reset": string,
        "x-oauth-scopes": string,
        "x-poll-interval": string,
        "x-github-request-id": string,
        "x-github-media-type": string,
        link: string,
        "last-modified": string,
        etag: string,
        status: string
    }
}