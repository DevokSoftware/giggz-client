/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
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
    contents?: Array<ContentResponse>;
    inactive?: boolean;
};

