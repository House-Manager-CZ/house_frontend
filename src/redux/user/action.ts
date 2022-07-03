import { createAction } from "@reduxjs/toolkit";
import { moduleName } from "./module";
import { TFetchLoginAction, TFetchRegisterAction } from "./types/user.schema";

export const ACTION_TYPES = {
  RUN_LOGIN: `${moduleName}/RUN_LOGIN`,
  RUN_REFRESH: `${moduleName}/RUN_REFRESH`,
  RUN_REGISTER: `${moduleName}/RUN_REGISTER`,
  SET_ACCESS_TOKEN: `${moduleName}/SET_ACCESS_TOKEN`,
  SET_REFRESH_TOKEN: `${moduleName}/SET_REFRESH_TOKEN`,
  SET_EXPIRES: `${moduleName}/SET_EXPIRES`,
  SET_LOGIN_REQUEST_STARTED: `${moduleName}/SET_LOGIN_REQUEST_STARTED`,
  SET_LOGIN_REQUEST_FINISHED: `${moduleName}/SET_LOGIN_REQUEST_FINISHED`,
  SET_LOGIN_REQUEST_ERROR: `${moduleName}/SET_LOGIN_REQUEST_ERROR`,
  SET_REFRESH_REQUEST_STARTED: `${moduleName}/SET_REFRESH_REQUEST_STARTED`,
  SET_REFRESH_REQUEST_FINISHED: `${moduleName}/SET_REFRESH_REQUEST_FINISHED`,
  SET_REFRESH_REQUEST_ERROR: `${moduleName}/SET_REFRESH_REQUEST_ERROR`,
  SET_REGISTER_REQUEST_STARTED: `${moduleName}/SET_REGISTER_REQUEST_STARTED`,
  SET_REGISTER_REQUEST_FINISHED: `${moduleName}/SET_REGISTER_REQUEST_FINISHED`,
  SET_REGISTER_REQUEST_ERROR: `${moduleName}/SET_REGISTER_REQUEST_ERROR`,
};

export const runLogin = createAction<TFetchLoginAction>(ACTION_TYPES.RUN_LOGIN);

export const runRefresh = createAction<void>(ACTION_TYPES.RUN_REFRESH);

export const runRegister = createAction<TFetchRegisterAction>(
  ACTION_TYPES.RUN_REGISTER
);

export const setAccessToken = createAction<string>(
  ACTION_TYPES.SET_ACCESS_TOKEN
);

export const setRefreshToken = createAction<string>(
  ACTION_TYPES.SET_REFRESH_TOKEN
);

export const setExpires = createAction<number>(ACTION_TYPES.SET_EXPIRES);

export const setLoginRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_LOGIN_REQUEST_STARTED
);

export const setLoginRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_LOGIN_REQUEST_FINISHED
);

export const setLoginRequestError = createAction<string>(
  ACTION_TYPES.SET_LOGIN_REQUEST_ERROR
);

export const setRefreshRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_REFRESH_REQUEST_STARTED
);

export const setRefreshRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_REFRESH_REQUEST_FINISHED
);

export const setRefreshRequestError = createAction<string>(
  ACTION_TYPES.SET_REFRESH_REQUEST_ERROR
);

export const setRegisterRequestStarted = createAction<boolean>(
  ACTION_TYPES.SET_REGISTER_REQUEST_STARTED
);

export const setRegisterRequestFinished = createAction<boolean>(
  ACTION_TYPES.SET_REGISTER_REQUEST_FINISHED
);

export const setRegisterRequestError = createAction<string>(
  ACTION_TYPES.SET_REGISTER_REQUEST_ERROR
);
