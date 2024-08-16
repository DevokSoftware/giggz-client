/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Location } from '../models/Location';
import type { LocationInput } from '../models/LocationInput';
import type { LocationsGetFiltersParameter } from '../models/LocationsGetFiltersParameter';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocationService {
    /**
     * @param locationId
     * @returns Location Existing location
     * @throws ApiError
     */
    public static locationsLocationIdGet(
        locationId: number,
    ): CancelablePromise<Location> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations/{locationId}',
            path: {
                'locationId': locationId,
            },
        });
    }
    /**
     * @param locationId
     * @param requestBody
     * @returns Location Location updated
     * @throws ApiError
     */
    public static locationsLocationIdPut(
        locationId: number,
        requestBody: LocationInput,
    ): CancelablePromise<Location> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/locations/{locationId}',
            path: {
                'locationId': locationId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param locationId
     * @returns any Location deleted
     * @throws ApiError
     */
    public static locationsLocationIdDelete(
        locationId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/locations/{locationId}',
            path: {
                'locationId': locationId,
            },
        });
    }
    /**
     * @param filters
     * @returns Location All existing locations
     * @throws ApiError
     */
    public static locationsGet(
        filters: LocationsGetFiltersParameter,
    ): CancelablePromise<Array<Location>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/locations',
            query: {
                'filters': filters,
            },
        });
    }
    /**
     * @param requestBody
     * @returns Location New location created
     * @throws ApiError
     */
    public static locationsPost(
        requestBody: LocationInput,
    ): CancelablePromise<Location> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/locations',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
