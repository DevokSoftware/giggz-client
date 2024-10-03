/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EventResponse } from '../models/EventResponse';
import type { UserProfile } from '../models/UserProfile';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Get User Profile
     * Retrieve the authenticated user's profile information.
     * @param userId
     * @returns UserProfile Successfully retrieved user profile
     * @throws ApiError
     */
    public static usersUserIdProfileGet(
        userId: number,
    ): CancelablePromise<UserProfile> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{userId}/profile',
            path: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized (invalid or missing token)`,
            },
        });
    }
    /**
     * Get Events attended by the user
     * Retrieve all the Events attended by the user
     * @param userId
     * @returns EventResponse Successfully retrieved standups attended by the user
     * @throws ApiError
     */
    public static usersUserIdEventsAttendedGet(
        userId: number,
    ): CancelablePromise<Array<EventResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{userId}/events/attended',
            path: {
                'userId': userId,
            },
            errors: {
                401: `Unauthorized (invalid or missing token)`,
            },
        });
    }
}
