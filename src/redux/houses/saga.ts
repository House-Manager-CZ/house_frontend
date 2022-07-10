import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  runGetHousesRequest,
  setGetHousesRequestError,
  setGetHousesRequestFinished,
  setGetHousesRequestStarted,
  setHouses,
  setSelectedHouseId,
} from "./actions";

import { TApiError } from "../../helpers/api/types/error.types";
import Api from "../../helpers/api/main.api";
import { TApiHouse } from "../../helpers/api/types/entities.types";
import { isLoggedInSelector, isTokenExpiredSelector } from "../user";
import { waitFor } from "../../helpers/saga/effects";
import { LOCAL_STORAGE_KEYS } from "../../helpers/localStorage/consts";

export function* housesSaga(): SagaIterator<void> {
  yield all([
    fork(initSaga),
    fork(fetchHousesWatcher),
    fork(setSelectedHouseWatcher),
  ]);
}

export function* initSaga() {
  yield put(runGetHousesRequest());

  try {
    const selectedHouseId: string | false = yield call(
      [localStorage, localStorage.getItem],
      LOCAL_STORAGE_KEYS.SELECTED_HOUSE_ID
    ) || false;

    if (selectedHouseId) {
      yield put(setSelectedHouseId(selectedHouseId));
    }
  } catch (e: unknown) {
    //
  }
}

export function* fetchHousesWatcher(): SagaIterator<void> {
  yield takeLatest(runGetHousesRequest, fetchHousesWorker);
}

export function* setSelectedHouseWatcher(): SagaIterator<void> {
  yield takeLatest(setSelectedHouseId, setSelectedHouseWorker);
}

export function* fetchHousesWorker() {
  yield call(waitFor, isLoggedInSelector);
  yield call(waitFor, (state: any) => !isTokenExpiredSelector(state));

  yield all([
    put(setGetHousesRequestStarted(true)),
    put(setGetHousesRequestFinished(false)),
    put(setGetHousesRequestError("")),
  ]);

  try {
    const houses: Array<TApiHouse> = yield Api.getInstance().houses.getHouses();

    yield put(setHouses(houses));

    yield put(setGetHousesRequestFinished(true));
  } catch (e: unknown) {
    const error = <AxiosError<TApiError>>e;

    yield put(
      setGetHousesRequestError(
        error.response?.data.message || "Can't fetch houses"
      )
    );
  } finally {
    yield put(setGetHousesRequestStarted(false));
  }
}

export function* setSelectedHouseWorker({
  payload,
}: ReturnType<typeof setSelectedHouseId>): SagaIterator<void> {
  yield call(
    [localStorage, localStorage.setItem],
    LOCAL_STORAGE_KEYS.SELECTED_HOUSE_ID,
    payload
  );
}
