import { createAction } from "@reduxjs/toolkit";
import { moduleName } from "./module";
import { TFetchLoginAction } from "./types/user.schema";

export const ACTION_TYPES = {
  RUN_LOGIN: `${moduleName}/RUN_LOGIN`,
  SET_ACCESS_TOKEN: `${moduleName}/SET_ACCESS_TOKEN`,
  SET_REFRESH_TOKEN: `${moduleName}/SET_REFRESH_TOKEN`,
  SET_LOGIN_REQUEST_STARTED: `${moduleName}/SET_LOGIN_REQUEST_STARTED`,
  SET_LOGIN_REQUEST_FINISHED: `${moduleName}/SET_LOGIN_REQUEST_FINISHED`,
  SET_LOGIN_REQUEST_ERROR: `${moduleName}/SET_LOGIN_REQUEST_ERROR`,
};

export const runLogin = createAction<TFetchLoginAction>(ACTION_TYPES.RUN_LOGIN);

export const setAccessToken = createAction<string>(
  ACTION_TYPES.SET_ACCESS_TOKEN
);

export const setRefreshToken = createAction<string>(
  ACTION_TYPES.SET_REFRESH_TOKEN
);

export const setLoginRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_LOGIN_REQUEST_STARTED
);

export const setLoginRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_LOGIN_REQUEST_FINISHED
);

export const setLoginRequestError = createAction<string>(
  ACTION_TYPES.SET_LOGIN_REQUEST_ERROR
);
