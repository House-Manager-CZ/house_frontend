import { createAction } from "@reduxjs/toolkit";
import { moduleName } from "./module";
import { TApiHouse } from "../../helpers/api/types/entities.types";
import {
  THouseCreateAction,
  THouseCreateError,
  THouseDeleteError,
  THouseEditAction,
  THouseEditError,
} from "./types/houses.schema";

export const ACTION_TYPES = {
  RUN_GET_HOUSES_REQUEST: `${moduleName}/RUN_GET_HOUSES_REQUEST`,
  RUN_CREATE_HOUSE_REQUEST: `${moduleName}/RUN_CREATE_HOUSE_REQUEST`,
  RUN_EDIT_HOUSE_REQUEST: `${moduleName}/RUN_EDIT_HOUSE_REQUEST`,
  RUN_DELETE_HOUSE_REQUEST: `${moduleName}/RUN_DELETE_HOUSE_REQUEST`,
  SET_HOUSES: `${moduleName}/SET_HOUSES`,
  SET_SELECTED_HOUSE_ID: `${moduleName}/SET_SELECTED_HOUSE_ID`,
  SET_GET_HOUSES_REQUEST_STARTED: `${moduleName}/SET_GET_HOUSES_REQUEST_STARTED`,
  SET_GET_HOUSES_REQUEST_FINISHED: `${moduleName}/SET_GET_HOUSES_REQUEST_FINISHED`,
  SET_GET_HOUSES_REQUEST_ERROR: `${moduleName}/SET_GET_HOUSES_REQUEST_ERROR`,
  SET_CREATE_HOUSE_REQUEST_STARTED: `${moduleName}/SET_CREATE_HOUSE_REQUEST_STARTED`,
  SET_CREATE_HOUSE_REQUEST_FINISHED: `${moduleName}/SET_CREATE_HOUSE_REQUEST_FINISHED`,
  SET_CREATE_HOUSE_REQUEST_ERROR: `${moduleName}/SET_CREATE_HOUSE_REQUEST_ERROR`,
  SET_EDIT_HOUSE_REQUEST_STARTED: `${moduleName}/SET_EDIT_HOUSE_REQUEST_STARTED`,
  SET_EDIT_HOUSE_REQUEST_FINISHED: `${moduleName}/SET_EDIT_HOUSE_REQUEST_FINISHED`,
  SET_EDIT_HOUSE_REQUEST_ERROR: `${moduleName}/SET_EDIT_HOUSE_REQUEST_ERROR`,
  SET_DELETE_HOUSE_REQUEST_STARTED: `${moduleName}/SET_DELETE_HOUSE_REQUEST_STARTED`,
  SET_DELETE_HOUSE_REQUEST_FINISHED: `${moduleName}/SET_DELETE_HOUSE_REQUEST_FINISHED`,
  SET_DELETE_HOUSE_REQUEST_ERROR: `${moduleName}/SET_DELETE_HOUSE_REQUEST_ERROR`,
};

export const runGetHousesRequest = createAction<void>(
  ACTION_TYPES.RUN_GET_HOUSES_REQUEST
);

export const runCreateHouseRequest = createAction<THouseCreateAction>(
  ACTION_TYPES.RUN_CREATE_HOUSE_REQUEST
);

export const runEditHouseRequest = createAction<THouseEditAction>(
  ACTION_TYPES.RUN_EDIT_HOUSE_REQUEST
);

export const runDeleteHouseRequest = createAction<string>(
  ACTION_TYPES.RUN_DELETE_HOUSE_REQUEST
);

export const setHouses = createAction<Array<TApiHouse>>(
  ACTION_TYPES.SET_HOUSES
);

export const setSelectedHouseId = createAction<string | false>(
  ACTION_TYPES.SET_SELECTED_HOUSE_ID
);

export const setGetHousesRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_GET_HOUSES_REQUEST_STARTED
);

export const setGetHousesRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_GET_HOUSES_REQUEST_FINISHED
);

export const setGetHousesRequestError = createAction<string>(
  ACTION_TYPES.SET_GET_HOUSES_REQUEST_ERROR
);

export const setCreateHouseRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_CREATE_HOUSE_REQUEST_STARTED
);

export const setCreateHouseRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_CREATE_HOUSE_REQUEST_FINISHED
);

export const setCreateHouseRequestError = createAction<
  THouseCreateError | false
>(ACTION_TYPES.SET_CREATE_HOUSE_REQUEST_ERROR);

export const setEditHouseRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_EDIT_HOUSE_REQUEST_STARTED
);

export const setEditHouseRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_EDIT_HOUSE_REQUEST_FINISHED
);

export const setEditHouseRequestError = createAction<THouseEditError | false>(
  ACTION_TYPES.SET_EDIT_HOUSE_REQUEST_ERROR
);

export const setDeleteHouseRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_DELETE_HOUSE_REQUEST_STARTED
);

export const setDeleteHouseRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_DELETE_HOUSE_REQUEST_FINISHED
);

export const setDeleteHouseRequestError = createAction<
  THouseDeleteError | false
>(ACTION_TYPES.SET_DELETE_HOUSE_REQUEST_ERROR);
