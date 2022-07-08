import { createSelector } from "@reduxjs/toolkit";
import { moduleName } from "./module";
import { TUserSchema } from "./types/user.schema";
import { checkUserData } from "../../helpers/user";

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

export const userInfoSelector = createSelector(
  userState,
  (state: TUserSchema) => state.userInfo
);

export const userInfoValidSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    state.userInfo !== false && checkUserData(state.userInfo)
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

export const registerRequestStartedSelector = createSelector(
  userState,
  (state: TUserSchema) => state.registerRequestStarted
);

export const registerRequestFinishedSelector = createSelector(
  userState,
  (state: TUserSchema) => state.registerRequestFinished
);

export const registerRequestErrorSelector = createSelector(
  userState,
  (state: TUserSchema) => state.registerRequestError
);

export const registerRequestLoadingSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    state.registerRequestStarted &&
    !(state.registerRequestFinished || state.registerRequestError)
);

export const registerRequestSuccessSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    !state.registerRequestStarted && state.registerRequestFinished
);

export const registerRequestFailedSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    !state.registerRequestStarted && !!state.registerRequestError
);

export const getMeInfoRequestStartedSelector = createSelector(
  userState,
  (state: TUserSchema) => state.getMeInfoRequestStarted
);

export const getMeInfoRequestFinishedSelector = createSelector(
  userState,
  (state: TUserSchema) => state.getMeInfoRequestFinished
);

export const getMeInfoRequestErrorSelector = createSelector(
  userState,
  (state: TUserSchema) => state.getMeInfoRequestError
);

export const getMeInfoRequestLoadingSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    state.getMeInfoRequestStarted &&
    !(state.getMeInfoRequestFinished || state.getMeInfoRequestError)
);

export const getMeInfoRequestSuccessSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    !state.getMeInfoRequestStarted && state.getMeInfoRequestFinished
);

export const getMeInfoRequestFailedSelector = createSelector(
  userState,
  (state: TUserSchema) =>
    !state.getMeInfoRequestStarted && !!state.getMeInfoRequestError
);
