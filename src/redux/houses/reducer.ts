import { createReducer } from "@reduxjs/toolkit";
import { HousesSchema } from "./schema";
import {
  runHousesRequest,
  setHouses,
  setHousesRequestError,
  setHousesRequestFinished,
  setHousesRequestStarted,
  setSelectedHouseId,
} from "./actions";

export default createReducer(HousesSchema, (builder) => {
  builder
    .addCase(runHousesRequest, () => {
      //
    })
    .addCase(setHouses, (state, action) => {
      state.houses = action.payload;
    })
    .addCase(setSelectedHouseId, (state, action) => {
      state.selectedHouseId = action.payload;
    })
    .addCase(setHousesRequestStarted, (state, action) => {
      state.getHousesRequestStarted = action.payload;
    })
    .addCase(setHousesRequestFinished, (state, action) => {
      state.getHousesRequestFinished = action.payload;
    })
    .addCase(setHousesRequestError, (state, action) => {
      state.getHousesRequestError = action.payload;
    });
});
