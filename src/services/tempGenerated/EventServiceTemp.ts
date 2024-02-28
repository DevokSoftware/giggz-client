/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateEventRequest } from "../openapi/models/CreateEventRequest";
import type { EventResponse } from "../openapi/models/EventResponse";
import type { EventsGetFiltersParameter } from "../openapi/models/EventsGetFiltersParameter";
import type { Pageable } from "../openapi/models/Pageable";
import type { PageEventResponse } from "../openapi/models/PageEventResponse";
import type { UpdateEventRequest } from "../openapi/models/UpdateEventRequest";
import type { CancelablePromise } from "../openapi/core/CancelablePromise";
import { OpenAPI } from "../openapi/core/OpenAPI";
import { request as __request } from "../openapi/core/request";

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
    filters: EventsGetFiltersParameter
  ): CancelablePromise<PageEventResponse> {
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

    if (filters.name) {
      queryParams.name = filters.name;
    }

    if (filters.city) {
      queryParams.city = filters.city;
    }

    if (filters.comedianId !== undefined) {
      queryParams.comedianId = filters.comedianId.toString();
    }
    if (filters.dateFrom) {
      queryParams.dateFrom = filters.dateFrom;
    }
    if (filters.dateTo) {
      queryParams.dateTo = filters.dateTo;
    }

    return __request(OpenAPI, {
      method: "GET",
      url: "/events",
      query: queryParams,
    });
  }
}
