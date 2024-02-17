/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type ContentResponse = {
    id: string;
    name?: string;
    contentType: ContentResponse.contentType;
    url?: string;
};
export namespace ContentResponse {
    export enum contentType {
        SPOTIFY = 'SPOTIFY',
        PATREON = 'PATREON',
        YOUTUBE = 'YOUTUBE',
    }
}

