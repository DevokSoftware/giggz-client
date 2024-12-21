/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewsContentComediansInner } from './NewsContentComediansInner';
export type NewsContent = {
    id: string;
    name?: string;
    contentType: NewsContent.contentType;
    url?: string;
    comedians?: Array<NewsContentComediansInner>;
};
export namespace NewsContent {
    export enum contentType {
        SPOTIFY = 'SPOTIFY',
        PATREON = 'PATREON',
        YOUTUBE = 'YOUTUBE',
    }
}

