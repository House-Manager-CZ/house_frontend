import { createReducer } from "@reduxjs/toolkit";
import { HousesSchema } from "./schema";
import {
  runCreateHouseRequest,
  runDeleteHouseRequest,
  runEditHouseRequest,
  runGetHousesRequest,
  setCreateHouseRequestError,
  setCreateHouseRequestFinished,
  setCreateHouseRequestStarted,
  setDeleteHouseRequestError,
  setDeleteHouseRequestFinished,
  setDeleteHouseRequestStarted,
  setEditHouseRequestError,
  setEditHouseRequestFinished,
  setEditHouseRequestStarted,
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
    .addCase(runEditHouseRequest, () => {
      //
    })
    .addCase(runDeleteHouseRequest, () => {
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
    })
    .addCase(setEditHouseRequestStarted, (state, action) => {
      state.editHouseRequestStarted = action.payload;
    })
    .addCase(setEditHouseRequestFinished, (state, action) => {
      state.editHouseRequestFinished = action.payload;
    })
    .addCase(setEditHouseRequestError, (state, action) => {
      state.editHouseRequestError = action.payload;
    })
    .addCase(setDeleteHouseRequestStarted, (state, action) => {
      state.deleteHouseRequestStarted = action.payload;
    })
    .addCase(setDeleteHouseRequestFinished, (state, action) => {
      state.deleteHouseRequestFinished = action.payload;
    })
    .addCase(setDeleteHouseRequestError, (state, action) => {
      state.deleteHouseRequestError = action.payload;
    });
});
