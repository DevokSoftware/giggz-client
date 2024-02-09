/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEventRequest } from '../models/CreateEventRequest';
import type { EventResponse } from '../models/EventResponse';
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
            url: '/api/events/{eventId}',
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
            url: '/api/events/{eventId}',
            path: {
                'eventId': eventId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns EventResponse All existing events
     * @throws ApiError
     */
    public static eventsGet(): CancelablePromise<Array<EventResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/events',
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
            url: '/api/events',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
