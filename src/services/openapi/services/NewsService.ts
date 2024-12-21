/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewsResponse } from '../models/NewsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NewsService {
    /**
     * @returns NewsResponse All the recent news among new standups, stand up specials, etc
     * @throws ApiError
     */
    public static newsGet(): CancelablePromise<NewsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/news',
        });
    }
}
