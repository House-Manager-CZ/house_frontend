import { createReducer } from "@reduxjs/toolkit";
import { UserSchema } from "./schema";
import {
  runLogin,
  setAccessToken,
  setExpires,
  setLoginRequestError,
  setLoginRequestFinished,
  setLoginRequestStarted,
  setRefreshRequestError,
  setRefreshRequestFinished,
  setRefreshRequestStarted,
  setRefreshToken,
  setRegisterRequestError,
  setRegisterRequestFinished,
  setRegisterRequestStarted,
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
    })
    .addCase(setRefreshRequestStarted, (state, action) => {
      state.refreshRequestStarted = action.payload;
    })
    .addCase(setRefreshRequestFinished, (state, action) => {
      state.refreshRequestFinished = action.payload;
    })
    .addCase(setRefreshRequestError, (state, action) => {
      state.refreshRequestError = action.payload;
    })
    .addCase(setRegisterRequestStarted, (state, action) => {
      state.registerRequestStarted = action.payload;
    })
    .addCase(setRegisterRequestFinished, (state, action) => {
      state.registerRequestFinished = action.payload;
    })
    .addCase(setRegisterRequestError, (state, action) => {
      state.registerRequestError = action.payload;
    });
});
