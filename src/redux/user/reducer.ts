import { createReducer } from "@reduxjs/toolkit";
import { UserSchema } from "./schema";
import {
  runLogin,
  setAccessToken,
  setExpires,
  setLoginRequestError,
  setLoginRequestFinished,
  setLoginRequestStarted,
  setRefreshToken,
} from "./action";

export default createReducer(UserSchema, (builder) => {
  builder
    .addCase(runLogin, () => {})
    .addCase(setAccessToken, (state, action) => {
      state.accessToken = action.payload;
    })
    .addCase(setRefreshToken, (state, action) => {
      state.refreshToken = action.payload;
    })
    .addCase(setExpires, (state, action) => {
      state.expires = action.payload;
    })
    .addCase(setLoginRequestStarted, (state, action) => {
      state.loginRequestStarted = action.payload;
    })
    .addCase(setLoginRequestFinished, (state, action) => {
      state.loginRequestFinished = action.payload;
    })
    .addCase(setLoginRequestError, (state, action) => {
      state.loginRequestError = action.payload;
    });
});
