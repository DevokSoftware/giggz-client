/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContentResponse } from './ContentResponse';
import type { EventResponse } from './EventResponse';
export type ComedianResponse = {
    id: string;
    name: string;
    description?: string;
    city?: string;
    picture?: string;
    instagram?: string;
    youtube?: string;
    tiktok?: string;
    twitter?: string;
    events?: Array<EventResponse>;
    contents?: Array<ContentResponse>;
};

