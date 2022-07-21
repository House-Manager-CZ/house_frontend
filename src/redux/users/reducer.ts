import { createReducer } from "@reduxjs/toolkit";
import { UsersSchema } from "./schema";
import {
  runSearchUsers,
  setSearchResults,
  setSearchUsersRequestError,
  setSearchUsersRequestFinished,
  setSearchUsersRequestStarted,
} from "./action";

export default createReducer(UsersSchema, (builder) => {
  builder
    .addCase(runSearchUsers, () => {
      // ...
    })
    .addCase(setSearchResults, (state, action) => {
      state.searchResults = action.payload;
    })
    .addCase(setSearchUsersRequestStarted, (state, action) => {
      state.searchUsersRequestStarted = action.payload;
    })
    .addCase(setSearchUsersRequestFinished, (state, action) => {
      state.searchUsersRequestFinished = action.payload;
    })
    .addCase(setSearchUsersRequestError, (state, action) => {
      state.searchUsersRequestError = action.payload;
    });
});
