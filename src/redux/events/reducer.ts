import { createReducer } from "@reduxjs/toolkit";
import { EventsSchema } from "./schema";
import {
  runGetEvents,
  setEvents,
  setGetEventsRequestError,
  setGetEventsRequestFinished,
  setGetEventsRequestStarted,
} from "./actions";

export default createReducer(EventsSchema, (builder) => {
  builder
    .addCase(runGetEvents, () => {
      // ...
    })
    .addCase(setEvents, (state, action) => {
      state.events = action.payload;
    })
    .addCase(setGetEventsRequestStarted, (state, action) => {
      state.getEventsRequestStarted = action.payload;
    })
    .addCase(setGetEventsRequestFinished, (state, action) => {
      state.getEventsRequestFinished = action.payload;
    })
    .addCase(setGetEventsRequestError, (state, action) => {
      state.getEventsRequestError = action.payload;
    });
});
