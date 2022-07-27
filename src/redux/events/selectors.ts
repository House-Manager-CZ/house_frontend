import { createSelector } from "@reduxjs/toolkit";
import { moduleName } from "./module";
import { TEventsSchema } from "./types/events.types";

const eventsState = (state: any): TEventsSchema => state[moduleName];

export const eventsSelector = createSelector(
  eventsState,
  (state: TEventsSchema) => state.events
);

export const getEventsRequestStartedSelector = createSelector(
  eventsState,
  (state: TEventsSchema) => state.getEventsRequestStarted
);

export const getEventsRequestFinishedSelector = createSelector(
  eventsState,
  (state: TEventsSchema) => state.getEventsRequestFinished
);

export const getEventsRequestErrorSelector = createSelector(
  eventsState,
  (state: TEventsSchema) => state.getEventsRequestError
);

export const getEventsRequestLoadingSelector = createSelector(
  eventsState,
  (state: TEventsSchema) =>
    state.getEventsRequestStarted &&
    !(state.getEventsRequestFinished || state.getEventsRequestError)
);

export const getEventsRequestSuccessSelector = createSelector(
  eventsState,
  (state: TEventsSchema) =>
    !state.getEventsRequestStarted && state.getEventsRequestFinished
);

export const getEventsRequestFailedSelector = createSelector(
  eventsState,
  (state: TEventsSchema) =>
    !state.getEventsRequestStarted && state.getEventsRequestError
);
