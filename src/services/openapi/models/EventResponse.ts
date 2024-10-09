/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventComedianResponse } from './EventComedianResponse';
import type { Location } from './Location';
import type { Standup } from './Standup';
export type EventResponse = {
    id: string;
    name: string;
    date?: string;
    description?: string;
    poster?: string;
    price?: number;
    url?: string;
    location?: Location;
    comedians?: Array<EventComedianResponse>;
    standup?: Standup;
    isAttendedByLoggedUser?: boolean;
};

