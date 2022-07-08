import { createSelector } from "@reduxjs/toolkit";
import { THousesSchema } from "./types/houses.schema";
import { moduleName } from "./module";

const housesState = (state: any): THousesSchema => state[moduleName];

export const housesSelector = createSelector(
  housesState,
  (state: THousesSchema) => state.houses
);

export const selectedHouseIdSelector = createSelector(
  housesState,
  (state: THousesSchema) => state.selectedHouseId
);

export const getHousesRequestStartedSelector = createSelector(
  housesState,
  (state: THousesSchema) => state.getHousesRequestStarted
);

export const getHousesRequestFinishedSelector = createSelector(
  housesState,
  (state: THousesSchema) => state.getHousesRequestFinished
);

export const getHousesRequestErrorSelector = createSelector(
  housesState,
  (state: THousesSchema) => state.getHousesRequestError
);

export const getHousesRequestLoadingSelector = createSelector(
  housesState,
  (state: THousesSchema) =>
    state.getHousesRequestStarted &&
    !(state.getHousesRequestFinished || state.getHousesRequestError)
);

export const getHousesRequestSuccessSelector = createSelector(
  housesState,
  (state: THousesSchema) =>
    !state.getHousesRequestStarted && state.getHousesRequestFinished
);

export const getHousesRequestFailedSelector = createSelector(
  housesState,
  (state: THousesSchema) =>
    !state.getHousesRequestStarted && !!state.getHousesRequestError
);
