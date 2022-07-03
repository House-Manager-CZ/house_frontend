import { createSelector } from "@reduxjs/toolkit";
import { moduleName } from "./module";
import { TUserSchema } from "./types/user.schema";

const userState = (state: any): TUserSchema => state[moduleName];

export const accessTokenSelector = createSelector(
  userState,
  (state: TUserSchema) => state.accessToken
);

export const refreshTokenSelector = createSelector(
  userState,
  (state: TUserSchema) => state.refreshToken
);

export const expiresSelector = createSelector(
  userState,
  (state: TUserSchema) => state.expires
);

export const isLoggedInSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    state.accessToken !== false &&
    state.refreshToken !== false &&
    state.expires !== false
);

export const isTokenExpiredSelector = createSelector(
  userState,
  (state: TUserSchema) => state.expires < Date.now()
);

export const loginRequestStartedSelector = createSelector(
  userState,
  (state: TUserSchema) => state.loginRequestStarted
);

export const loginRequestFinishedSelector = createSelector(
  userState,
  (state: TUserSchema) => state.loginRequestFinished
);

export const loginRequestErrorSelector = createSelector(
  userState,
  (state: TUserSchema) => state.loginRequestError
);

export const loginRequestLoadingSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    state.loginRequestStarted &&
    !(state.loginRequestFinished || state.loginRequestError)
);

export const loginRequestSuccessSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    !state.loginRequestStarted && state.loginRequestFinished
);

export const loginRequestFailedSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    !state.loginRequestStarted && !!state.loginRequestError
);

export const refreshRequestStartedSelector = createSelector(
  userState,
  (state: TUserSchema) => state.refreshRequestStarted
);

export const refreshRequestFinishedSelector = createSelector(
  userState,
  (state: TUserSchema) => state.refreshRequestFinished
);

export const refreshRequestErrorSelector = createSelector(
  userState,
  (state: TUserSchema) => state.refreshRequestError
);

export const refreshRequestLoadingSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    state.refreshRequestStarted &&
    !(state.refreshRequestFinished || state.refreshRequestError)
);

export const refreshRequestSuccessSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    !state.refreshRequestStarted && state.refreshRequestFinished
);

export const refreshRequestFailedSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    !state.refreshRequestStarted && !!state.refreshRequestError
);
