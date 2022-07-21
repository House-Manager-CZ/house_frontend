import { createAction } from "@reduxjs/toolkit";
import { moduleName } from "./module";
import { TApiUser } from "../../helpers/api/types/entities.types";

export const ACTION_TYPES = {
  RUN_SEARCH_USERS: `${moduleName}/RUN_SEARCH_USERS`,
  SET_SEARCH_RESULTS: `${moduleName}/SET_SEARCH_RESULTS`,
  SET_SEARCH_USERS_REQUEST_STARTED: `${moduleName}/SET_SEARCH_USERS_REQUEST_STARTED`,
  SET_SEARCH_USERS_REQUEST_FINISHED: `${moduleName}/SET_SEARCH_USERS_REQUEST_FINISHED`,
  SET_SEARCH_USERS_REQUEST_ERROR: `${moduleName}/SET_SEARCH_USERS_REQUEST_ERROR`,
};

export const runSearchUsers = createAction<string>(
  ACTION_TYPES.RUN_SEARCH_USERS
);

export const setSearchResults = createAction<Array<TApiUser>>(
  ACTION_TYPES.SET_SEARCH_RESULTS
);

export const setSearchUsersRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_SEARCH_USERS_REQUEST_STARTED
);

export const setSearchUsersRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_SEARCH_USERS_REQUEST_FINISHED
);

export const setSearchUsersRequestError = createAction<string>(
  ACTION_TYPES.SET_SEARCH_USERS_REQUEST_ERROR
);
