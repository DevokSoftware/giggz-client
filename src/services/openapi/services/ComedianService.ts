/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComedianResponse } from '../models/ComedianResponse';
import type { ComediansComedianIdEventsGetFiltersParameter } from '../models/ComediansComedianIdEventsGetFiltersParameter';
import type { ComediansComedianIdFavoritePostRequest } from '../models/ComediansComedianIdFavoritePostRequest';
import type { ComediansGetFiltersParameter } from '../models/ComediansGetFiltersParameter';
import type { CreateComedianRequest } from '../models/CreateComedianRequest';
import type { Pageable } from '../models/Pageable';
import type { PageComedianEventsResponse } from '../models/PageComedianEventsResponse';
import type { PageComedianResponse } from '../models/PageComedianResponse';
import type { UpdateComedianRequest } from '../models/UpdateComedianRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ComedianService {
    /**
     * @param comedianId
     * @returns ComedianResponse Existing comedian
     * @throws ApiError
     */
    public static comediansComedianIdGet(
        comedianId: number,
    ): CancelablePromise<ComedianResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comedians/{comedianId}',
            path: {
                'comedianId': comedianId,
            },
        });
    }
    /**
     * @param comedianId
     * @param requestBody
     * @returns ComedianResponse Comedian updated
     * @throws ApiError
     */
    public static comediansComedianIdPut(
        comedianId: number,
        requestBody: UpdateComedianRequest,
    ): CancelablePromise<ComedianResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/comedians/{comedianId}',
            path: {
                'comedianId': comedianId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param comedianId
     * @returns any Comedian deleted
     * @throws ApiError
     */
    public static comediansComedianIdDelete(
        comedianId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/comedians/{comedianId}',
            path: {
                'comedianId': comedianId,
            },
        });
    }
    /**
     * @param pageable
     * @param filters
     * @returns PageComedianResponse All existing comedians
     * @throws ApiError
     */
    public static comediansGet(
        pageable: Pageable,
        filters: ComediansGetFiltersParameter,
    ): CancelablePromise<PageComedianResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comedians',
            query: {
                'pageable': pageable,
                'filters': filters,
            },
        });
    }
    /**
     * @param requestBody
     * @returns ComedianResponse Comedian created
     * @throws ApiError
     */
    public static comediansPost(
        requestBody: CreateComedianRequest,
    ): CancelablePromise<ComedianResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/comedians',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param comedianId
     * @param requestBody
     * @returns ComedianResponse Favorite comedian added
     * @throws ApiError
     */
    public static comediansComedianIdFavoritePost(
        comedianId: number,
        requestBody: ComediansComedianIdFavoritePostRequest,
    ): CancelablePromise<ComedianResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/comedians/{comedianId}/favorite',
            path: {
                'comedianId': comedianId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param comedianId
     * @param pageable
     * @param filters
     * @returns PageComedianEventsResponse All existing comedian events
     * @throws ApiError
     */
    public static comediansComedianIdEventsGet(
        comedianId: number,
        pageable: Pageable,
        filters: ComediansComedianIdEventsGetFiltersParameter,
    ): CancelablePromise<PageComedianEventsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comedians/{comedianId}/events',
            path: {
                'comedianId': comedianId,
            },
            query: {
                'pageable': pageable,
                'filters': filters,
            },
        });
    }
}
