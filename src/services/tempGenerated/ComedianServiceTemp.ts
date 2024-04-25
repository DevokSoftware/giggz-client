/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComedianResponse } from "../openapi/models/ComedianResponse";
import type { ComediansGetFiltersParameter } from "../openapi/models/ComediansGetFiltersParameter";
import type { Pageable } from "../openapi/models/Pageable";
import type { PageComedianResponse } from "../openapi/models/PageComedianResponse";
import type { CancelablePromise } from "../openapi/core/CancelablePromise";
import { OpenAPI } from "../openapi/core/OpenAPI";
import { request as __request } from "../openapi/core/request";
import {
  ComediansComedianIdEventsGetFiltersParameter,
  PageComedianEventsResponse,
} from "../openapi";
export class ComedianServiceTemp {
  /**
   * @param pageable
   * @param filters
   * @param sort
   * @returns PageComedianResponse All existing comedians
   * @throws ApiError
   */
  public static comediansGet(
    pageable: Pageable,
    filters: ComediansGetFiltersParameter,
    sort?: Array<string>
  ): CancelablePromise<PageComedianResponse> {
    const queryParams: Record<string, string | number | undefined> = {
      pageable: JSON.stringify(pageable),
    };

    if (pageable) {
      if (pageable.sort) {
        queryParams.sort = pageable.sort[0] + "," + pageable.sort[1];
      }

      if (pageable.page) {
        queryParams.page = pageable.page;
      }
      if (pageable.size) {
        queryParams.size = pageable.size;
      }
    }

    if (filters.name) {
      queryParams.name = filters.name;
    }

    if (sort && sort.length > 0) {
      queryParams.sort = sort.join(",");
    }
    return __request(OpenAPI, {
      method: "GET",
      url: "/comedians",
      query: queryParams,
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
    filters: ComediansComedianIdEventsGetFiltersParameter
  ): CancelablePromise<PageComedianEventsResponse> {
    const queryParams: Record<string, string | number | undefined> = {};

    if (pageable) {
      if (pageable.sort) {
        queryParams.sort = pageable.sort[0] + "," + pageable.sort[1];
      }

      if (pageable.page) {
        queryParams.page = pageable.page;
      }
      if (pageable.size) {
        queryParams.size = pageable.size;
      }
    }
    if (filters.dateFrom) {
      queryParams.dateFrom = filters.dateFrom;
    }
    if (filters.dateTo) {
      queryParams.dateTo = filters.dateTo;
    }

    return __request(OpenAPI, {
      method: "GET",
      url: "/comedians/{comedianId}/events",
      path: {
        comedianId: comedianId,
      },
      query: queryParams,
    });
  }
}
