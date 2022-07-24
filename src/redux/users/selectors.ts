import { createSelector } from "@reduxjs/toolkit";
import { moduleName } from "./module";
import { TUsersSchema } from "./types/users.schema";

const usersState = (state: any): TUsersSchema => state[moduleName];

export const usersSearchResultsSelector = createSelector(
  usersState,
  (state: TUsersSchema) => state.searchResults
);

export const searchUsersRequestStarted = createSelector(
  usersState,
  (state: TUsersSchema) => state.searchUsersRequestStarted
);

export const searchUsersRequestFinished = createSelector(
  usersState,
  (state: TUsersSchema) => state.searchUsersRequestFinished
);

export const searchUsersRequestError = createSelector(
  usersState,
  (state: TUsersSchema) => state.searchUsersRequestError
);

export const searchUsersRequestLoading = createSelector(
  usersState,
  (state: TUsersSchema) =>
    state.searchUsersRequestStarted &&
    !(state.searchUsersRequestFinished || state.searchUsersRequestError)
);

export const searchUsersRequestSuccess = createSelector(
  usersState,
  (state: TUsersSchema) =>
    !state.searchUsersRequestStarted && state.searchUsersRequestFinished
);

export const searchUsersRequestFailed = createSelector(
  usersState,
  (state: TUsersSchema) =>
    !state.searchUsersRequestStarted && state.searchUsersRequestError
);
