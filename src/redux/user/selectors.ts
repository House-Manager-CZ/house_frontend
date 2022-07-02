import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "../store";
import { moduleName } from "./module";
import { TUserSchema } from "./types/user.schema";

const userState = (state: TRootState) => state[moduleName];

export const accessTokenSelector = createSelector(
  userState,
  (state: TUserSchema) => state.accessToken
);

export const refreshTokenSelector = createSelector(
  userState,
  (state: TUserSchema) => state.refreshToken
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
