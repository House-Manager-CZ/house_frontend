import { createReducer } from "@reduxjs/toolkit";
import { HousesSchema } from "./schema";
import {
  runCreateHouseRequest,
  runGetHousesRequest,
  setCreateHouseRequestError,
  setCreateHouseRequestFinished,
  setCreateHouseRequestStarted,
  setGetHousesRequestError,
  setGetHousesRequestFinished,
  setGetHousesRequestStarted,
  setHouses,
  setSelectedHouseId,
} from "./actions";

export default createReducer(HousesSchema, (builder) => {
  builder
    .addCase(runGetHousesRequest, () => {
      //
    })
    .addCase(runCreateHouseRequest, () => {
      //
    })
    .addCase(setHouses, (state, action) => {
      state.houses = action.payload;
    })
    .addCase(setSelectedHouseId, (state, action) => {
      state.selectedHouseId = action.payload;
    })
    .addCase(setGetHousesRequestStarted, (state, action) => {
      state.getHousesRequestStarted = action.payload;
    })
    .addCase(setGetHousesRequestFinished, (state, action) => {
      state.getHousesRequestFinished = action.payload;
    })
    .addCase(setGetHousesRequestError, (state, action) => {
      state.getHousesRequestError = action.payload;
    })
    .addCase(setCreateHouseRequestStarted, (state, action) => {
      state.createHouseRequestStarted = action.payload;
    })
    .addCase(setCreateHouseRequestFinished, (state, action) => {
      state.createHouseRequestFinished = action.payload;
    })
    .addCase(setCreateHouseRequestError, (state, action) => {
      state.createHouseRequestError = action.payload;
    });
});
