import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import * as Sentry from "@sentry/react";
import rootReducer from "./reducer";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const sentryReduxEnhancer = Sentry.createReduxEnhancer();

const store = configureStore({
  devTools: true,
  middleware: [sagaMiddleware],
  enhancers: [sentryReduxEnhancer],
  reducer: rootReducer,
});

sagaMiddleware.run(rootSaga);

export type TRootState = ReturnType<typeof store.getState>;

export type TAppDispatch = typeof store.dispatch;

export default store;
