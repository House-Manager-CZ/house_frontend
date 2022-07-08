import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  runHousesRequest,
  setHouses,
  setHousesRequestError,
  setHousesRequestFinished,
  setHousesRequestStarted,
  setSelectedHouseId,
} from "./actions";
import { TApiError } from "../../helpers/api/types/error.types";
import Api from "../../helpers/api/main.api";
import { TApiHouse } from "../../helpers/api/types/entities.types";
import { isLoggedInSelector, isTokenExpiredSelector } from "../user";
import { waitFor } from "../../helpers/saga/effects";
import { LOCAL_STORAGE_KEYS } from "../../helpers/localStorage/consts";

export function* housesSaga(): SagaIterator<void> {
  yield all([fork(initSaga), fork(fetchHousesWatcher)]);
}

export function* initSaga() {
  yield put(runHousesRequest());

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
