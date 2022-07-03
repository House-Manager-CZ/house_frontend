import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  runHousesRequest,
  setHouses,
  setHousesRequestError,
  setHousesRequestFinished,
  setHousesRequestStarted,
} from "./actions";
import { TApiError } from "../../helpers/api/types/error.types";
import Api from "../../helpers/api/main.api";
import { TApiHouse } from "../../helpers/api/types/entities.types";
import { isLoggedInSelector, isTokenExpiredSelector } from "../user";
import { waitFor } from "../../helpers/saga/effects";

export function* housesSaga(): SagaIterator<void> {
  yield all([fork(fetchHousesWatcher)]);

  yield put(runHousesRequest());
}

export function* fetchHousesWatcher(): SagaIterator<void> {
  yield takeLatest(runHousesRequest, fetchHousesWorker);
}

export function* fetchHousesWorker() {
  yield call(waitFor, isLoggedInSelector);
  yield call(waitFor, (state: any) => !isTokenExpiredSelector(state));

  yield all([
    put(setHousesRequestStarted(true)),
    put(setHousesRequestFinished(false)),
    put(setHousesRequestError("")),
  ]);

  try {
    const houses: Array<TApiHouse> = yield Api.getInstance().houses.getHouses();

    yield put(setHouses(houses));

    yield put(setHousesRequestFinished(true));
  } catch (e: unknown) {
    const error = <AxiosError<TApiError>>e;

    yield put(
      setHousesRequestError(
        error.response?.data.message || "Can't fetch houses"
      )
    );
  } finally {
    yield put(setHousesRequestStarted(false));
  }
}
