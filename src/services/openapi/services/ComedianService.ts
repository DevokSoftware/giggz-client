/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComedianResponse } from '../models/ComedianResponse';
import type { ComediansComedianIdEventsGetFiltersParameter } from '../models/ComediansComedianIdEventsGetFiltersParameter';
import type { ComediansGetFiltersParameter } from '../models/ComediansGetFiltersParameter';
import type { Pageable } from '../models/Pageable';
import type { PageComedianEventsResponse } from '../models/PageComedianEventsResponse';
import type { PageComedianResponse } from '../models/PageComedianResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ComedianService {
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
