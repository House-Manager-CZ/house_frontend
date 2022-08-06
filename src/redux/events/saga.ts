import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  runGetEvents,
  setEvents,
  setGetEventsRequestError,
  setGetEventsRequestFinished,
  setGetEventsRequestStarted,
} from "./actions";
import { TApiError } from "../../helpers/api/types/error.types";
import Api from "../../helpers/api/main.api";
import { TApiEvent } from "../../helpers/api/types/entities.types";
import AlertService from "../../helpers/alertService/alertService";
import { waitFor } from "../../helpers/saga/effects";
import { isLoggedInSelector, isTokenExpiredSelector } from "../user";
import { TRootState } from "../store";
import { selectedHouseSelector } from "../houses";

export function* eventsSaga(): SagaIterator<void> {
  yield all([fork(fetchEventsWatcher), fork(fetchEventsErrorWatcher)]);
}

export function* fetchEventsWatcher(): SagaIterator<void> {
  yield takeLatest(runGetEvents, fetchEventsWorker);
}

export function* fetchEventsErrorWatcher(): SagaIterator<void> {
  yield takeLatest(setGetEventsRequestError, fetchEventsErrorWorker);
}

export function* fetchEventsWorker({
  payload,
}: ReturnType<typeof runGetEvents>) {
  yield call(waitFor, isLoggedInSelector);
  yield call(waitFor, (state: any) => !isTokenExpiredSelector(state));
  yield call(
    waitFor,
    (state: TRootState) => selectedHouseSelector(state) !== false
  );

  yield all([
    put(setGetEventsRequestStarted(true)),
    put(setGetEventsRequestFinished(false)),
    put(setGetEventsRequestError(false)),
  ]);

  try {
    const events: Array<TApiEvent> = yield Api.getInstance().events.getEvents(
      payload
    );

    yield put(setEvents(events));

    yield put(setGetEventsRequestFinished(true));
  } catch (e: unknown) {
    const error = <AxiosError<TApiError>>e;

    yield put(
      setGetEventsRequestError({
        title: error.response?.data?.message || "Cannot get events",
        message:
          Object.values(error.response?.data?.errors?.[0] || {})[0] ||
          "Unknown error",
      })
    );
  } finally {
    yield put(setGetEventsRequestStarted(false));
  }
}

export function fetchEventsErrorWorker({
  payload,
}: ReturnType<typeof setGetEventsRequestError>) {
  if (payload !== false)
    AlertService.alert({
      title: payload.title,
      message: payload.message,
      severity: "error",
    });
}
