/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComediansGetFiltersParameter } from '../models/ComediansGetFiltersParameter';
import type { Standup } from '../models/Standup';
import type { StandupInput } from '../models/StandupInput';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StandupService {
    /**
     * @param standupId
     * @returns Standup Existing stand-up
     * @throws ApiError
     */
    public static standupsStandupIdGet(
        standupId: number,
    ): CancelablePromise<Standup> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/standups/{standupId}',
            path: {
                'standupId': standupId,
            },
        });
    }
    /**
     * @param standupId
     * @param requestBody
     * @returns Standup Stand-up updated
     * @throws ApiError
     */
    public static standupsStandupIdPut(
        standupId: number,
        requestBody: StandupInput,
    ): CancelablePromise<Standup> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/standups/{standupId}',
            path: {
                'standupId': standupId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param standupId
     * @returns any Stand-up deleted
     * @throws ApiError
     */
    public static standupsStandupIdDelete(
        standupId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/standups/{standupId}',
            path: {
                'standupId': standupId,
            },
        });
    }
    /**
     * @param filters
     * @returns Standup All existing stand-ups
     * @throws ApiError
     */
    public static standupsGet(
        filters: ComediansGetFiltersParameter,
    ): CancelablePromise<Array<Standup>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/standups',
            query: {
                'filters': filters,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Standup New stand-up created
     * @throws ApiError
     */
    public static standupsPost(
        requestBody: StandupInput,
    ): CancelablePromise<Standup> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/standups',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
