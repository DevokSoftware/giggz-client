/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEventRequest } from "../models/CreateEventRequest";
import type { EventResponse } from "../models/EventResponse";
import type { EventsGetFiltersParameter } from "../models/EventsGetFiltersParameter";
import type { Pageable } from "../models/Pageable";
import type { PageEventResponse } from "../models/PageEventResponse";
import type { UpdateEventRequest } from "../models/UpdateEventRequest";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

/**
 * This class in temporary since the openapi-typescript does not support yet objects in the query parameters,
 * so it was needed to "override" the default implementation. It is a feature that the contributors are currently working on
 * but there is no release date yet, only an open PR with the implementation.
 * */
export class EventServiceTemp {
  /**
   * @param pageable
   * @param filters
   * @param sort
   * @returns PageEventResponse All existing events
   * @throws ApiError
   */
  public static eventsGet(
    pageable: Pageable,
    filters: EventsGetFiltersParameter,
    sort?: Array<string>
  ): CancelablePromise<PageEventResponse> {
    const queryParams: Record<string, string | number | undefined> = {};

    if (pageable && pageable.sort) {
      queryParams.sort = pageable.sort[0] + "," + pageable.sort[1];
    }

    if (filters.name) {
      queryParams.name = filters.name;
    }

    if (filters.city) {
      queryParams.city = filters.city;
    }

    if (filters.comedianId !== undefined) {
      queryParams.comedianId = filters.comedianId.toString();
    }

    if (sort && sort.length > 0) {
      queryParams.sort = sort.join(",");
    }

    return __request(OpenAPI, {
      method: "GET",
      url: "/events",
      query: queryParams,
    });
  }
}
