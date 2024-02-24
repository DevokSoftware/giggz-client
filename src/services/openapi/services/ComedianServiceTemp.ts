/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ComedianResponse } from "../models/ComedianResponse";
import type { ComediansGetFiltersParameter } from "../models/ComediansGetFiltersParameter";
import type { Pageable } from "../models/Pageable";
import type { PageComedianResponse } from "../models/PageComedianResponse";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
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
}
