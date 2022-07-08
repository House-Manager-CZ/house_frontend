import { createAction } from "@reduxjs/toolkit";
import { moduleName } from "./module";
import { TApiHouse } from "../../helpers/api/types/entities.types";

export const ACTION_TYPES = {
  RUN_HOUSES_REQUEST: `${moduleName}/RUN_HOUSES_REQUEST`,
  SET_HOUSES: `${moduleName}/SET_HOUSES`,
  SET_SELECTED_HOUSE_ID: `${moduleName}/SET_SELECTED_HOUSE_ID`,
  SET_HOUSES_REQUEST_STARTED: `${moduleName}/SET_HOUSES_REQUEST_STARTED`,
  SET_HOUSES_REQUEST_FINISHED: `${moduleName}/SET_HOUSES_REQUEST_FINISHED`,
  SET_HOUSES_REQUEST_ERROR: `${moduleName}/SET_HOUSES_REQUEST_ERROR`,
};

export const runHousesRequest = createAction<void>(
  ACTION_TYPES.RUN_HOUSES_REQUEST
);

export const setHouses = createAction<Array<TApiHouse>>(
  ACTION_TYPES.SET_HOUSES
);

export const setSelectedHouseId = createAction<string>(
  ACTION_TYPES.SET_SELECTED_HOUSE_ID
);

export const setHousesRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_HOUSES_REQUEST_STARTED
);

export const setHousesRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_HOUSES_REQUEST_FINISHED
);

export const setHousesRequestError = createAction<string>(
  ACTION_TYPES.SET_HOUSES_REQUEST_ERROR
);
