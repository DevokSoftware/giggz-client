/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttendedEventInput } from '../models/AttendedEventInput';
import type { CreateEventRequest } from '../models/CreateEventRequest';
import type { EventResponse } from '../models/EventResponse';
import type { EventsGetFiltersParameter } from '../models/EventsGetFiltersParameter';
import type { Pageable } from '../models/Pageable';
import type { PageEventResponse } from '../models/PageEventResponse';
import type { UpdateEventRequest } from '../models/UpdateEventRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EventService {
    /**
     * @param eventId
     * @returns EventResponse Existing event
     * @throws ApiError
     */
    public static eventsEventIdGet(
        eventId: number,
    ): CancelablePromise<EventResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events/{eventId}',
            path: {
                'eventId': eventId,
            },
        });
    }
    /**
     * @param eventId
     * @param requestBody
     * @returns EventResponse Event updated
     * @throws ApiError
     */
    public static eventsEventIdPut(
        eventId: number,
        requestBody: UpdateEventRequest,
    ): CancelablePromise<EventResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/events/{eventId}',
            path: {
                'eventId': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param eventId
     * @returns any Event deleted
     * @throws ApiError
     */
    public static eventsEventIdDelete(
        eventId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/events/{eventId}',
            path: {
                'eventId': eventId,
            },
        });
    }
    /**
     * @param pageable
     * @param filters
     * @returns PageEventResponse All existing events
     * @throws ApiError
     */
    public static eventsGet(
        pageable: Pageable,
        filters: EventsGetFiltersParameter,
    ): CancelablePromise<PageEventResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/events',
            query: {
                'pageable': pageable,
                'filters': filters,
            },
        });
    }
    /**
     * @param requestBody
     * @returns EventResponse New event created
     * @throws ApiError
     */
    public static eventsPost(
        requestBody: CreateEventRequest,
    ): CancelablePromise<EventResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param eventId
     * @param requestBody
     * @returns EventResponse Event attended
     * @throws ApiError
     */
    public static eventsEventIdAttendedPost(
        eventId: number,
        requestBody: AttendedEventInput,
    ): CancelablePromise<EventResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/events/{eventId}/attended',
            path: {
                'eventId': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
