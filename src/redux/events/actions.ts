import { createAction } from "@reduxjs/toolkit";
import { moduleName } from "./module";
import { TGetEventsError } from "./types/events.types";
import { TEventsApiGetParams } from "../../helpers/api/events.api";
import { TApiEvent } from "../../helpers/api/types/entities.types";

export const ACTION_TYPES = {
  RUN_GET_EVENTS: `${moduleName}/RUN_GET_EVENTS`,
  SET_EVENTS: `${moduleName}/SET_EVENTS`,
  SET_GET_EVENTS_REQUEST_STARTED: `${moduleName}/SET_GET_EVENTS_REQUEST_STARTED`,
  SET_GET_EVENTS_REQUEST_FINISHED: `${moduleName}/SET_GET_EVENTS_REQUEST_FINISHED`,
  SET_GET_EVENTS_REQUEST_ERROR: `${moduleName}/SET_GET_EVENTS_REQUEST_ERROR`,
};

export const runGetEvents = createAction<TEventsApiGetParams>(
  ACTION_TYPES.RUN_GET_EVENTS
);

export const setEvents = createAction<Array<TApiEvent>>(
  ACTION_TYPES.SET_EVENTS
);

export const setGetEventsRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_GET_EVENTS_REQUEST_STARTED
);

export const setGetEventsRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_GET_EVENTS_REQUEST_FINISHED
);

export const setGetEventsRequestError = createAction<TGetEventsError | false>(
  ACTION_TYPES.SET_GET_EVENTS_REQUEST_ERROR
);
