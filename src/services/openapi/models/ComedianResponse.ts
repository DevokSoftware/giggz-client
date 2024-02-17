/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComedianEventResponse } from './ComedianEventResponse';
import type { ContentResponse } from './ContentResponse';
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
    events?: Array<ComedianEventResponse>;
    contents?: Array<ContentResponse>;
};

