/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComedianResponse } from '../models/ComedianResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ComedianService {
    /**
     * @returns ComedianResponse All existing comedians
     * @throws ApiError
     */
    public static comediansGet(): CancelablePromise<Array<ComedianResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/comedians',
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
            url: '/api/comedians/{comedianId}',
            path: {
                'comedianId': comedianId,
            },
        });
    }
}
