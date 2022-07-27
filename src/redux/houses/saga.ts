import { SagaIterator } from "redux-saga";
import {
  all,
  call,
  delay,
  fork,
  put,
  take,
  takeLatest,
} from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  ACTION_TYPES,
  runCreateHouseRequest,
  runDeleteHouseRequest,
  runGetHousesRequest,
  setCreateHouseRequestError,
  setCreateHouseRequestFinished,
  setCreateHouseRequestStarted,
  setDeleteHouseRequestError,
  setDeleteHouseRequestFinished,
  setDeleteHouseRequestStarted,
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
import { runGetEvents } from "../events";
import { getHousesRequestLoadingSelector } from "./selectors";

export function* housesSaga(): SagaIterator<void> {
  yield all([
    fork(initSaga),
    fork(fetchHousesWatcher),
    fork(createHouseWatcher),
    fork(deleteHouseWatcher),
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

export function* createHouseWatcher(): SagaIterator<void> {
  yield takeLatest(runCreateHouseRequest, createHouseWorker);
}

export function* deleteHouseWatcher(): SagaIterator<void> {
  yield takeLatest(runDeleteHouseRequest, deleteHouseWorker);
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

export function* createHouseWorker({
  payload,
}: ReturnType<typeof runCreateHouseRequest>) {
  yield all([
    put(setCreateHouseRequestStarted(true)),
    put(setCreateHouseRequestFinished(false)),
    put(setCreateHouseRequestError(false)),
  ]);

  try {
    yield Api.getInstance().houses.createHouse(payload);

    yield put(runGetHousesRequest());

    yield take(ACTION_TYPES.SET_GET_HOUSES_REQUEST_FINISHED);
    yield take(ACTION_TYPES.SET_GET_HOUSES_REQUEST_FINISHED);

    yield put(setCreateHouseRequestFinished(true));
  } catch (e: unknown) {
    const error = <AxiosError<TApiError>>e;

    yield put(
      setCreateHouseRequestError({
        title: error.response?.data?.message || "Can't create house",
        message:
          Object.values(error.response?.data?.errors?.[0] || {})[0] ||
          "Unknown error",
      })
    );
  } finally {
    yield put(setCreateHouseRequestStarted(false));
    yield delay(0);
    yield put(setCreateHouseRequestFinished(false));
  }
}

export function* deleteHouseWorker({
  payload,
}: ReturnType<typeof runDeleteHouseRequest>) {
  yield all([
    put(setDeleteHouseRequestStarted(true)),
    put(setDeleteHouseRequestFinished(false)),
    put(setDeleteHouseRequestError(false)),
  ]);

  try {
    yield Api.getInstance().houses.deleteHouse(payload);

    yield put(runGetHousesRequest());
    yield delay(0);
    yield call(waitFor, (state) => !getHousesRequestLoadingSelector(state));

    yield put(setDeleteHouseRequestFinished(true));
  } catch (e: unknown) {
    const error = <AxiosError<TApiError>>e;

    yield put(
      setDeleteHouseRequestError({
        title: error.response?.data?.message || "Can't delete house",
        message:
          Object.values(error.response?.data?.errors?.[0] || {})[0] ||
          "Unknown error",
      })
    );
  } finally {
    yield put(setDeleteHouseRequestStarted(false));
    yield delay(0);
    yield put(setDeleteHouseRequestFinished(false));
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

  yield put(
    runGetEvents({
      house: payload,
      direction: "upcoming",
    })
  );
}
