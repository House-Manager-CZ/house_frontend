import { SagaIterator } from "redux-saga";
import { all, fork, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  runSearchUsers,
  setSearchResults,
  setSearchUsersRequestError,
  setSearchUsersRequestFinished,
  setSearchUsersRequestStarted,
} from "./action";
import Api from "../../helpers/api/main.api";
import { TApiUser } from "../../helpers/api/types/entities.types";
import { TApiError } from "../../helpers/api/types/error.types";
import AlertService from "../../helpers/alertService/alertService";

export function* usersSaga(): SagaIterator<void> {
  yield all([fork(searchUsersWatcher), fork(errorUsersWatcher)]);
}

export function* searchUsersWatcher(): SagaIterator<void> {
  yield takeLatest(runSearchUsers, searchUsersWorker);
}

export function* errorUsersWatcher(): SagaIterator<void> {
  yield takeLatest(setSearchUsersRequestError, errorUsersWorker);
}

export function* searchUsersWorker({
  payload,
}: ReturnType<typeof runSearchUsers>) {
  yield all([
    put(setSearchUsersRequestStarted(true)),
    put(setSearchUsersRequestFinished(false)),
    put(setSearchUsersRequestError(false)),
  ]);

  try {
    const searchResults: Array<TApiUser> =
      yield Api.getInstance().users.searchUsers(payload);

    yield put(setSearchResults(searchResults));

    yield put(setSearchUsersRequestFinished(true));
  } catch (e) {
    const error = <AxiosError<TApiError>>e;

    yield put(
      setSearchUsersRequestError({
        title: error.response?.data?.message || "Cannot search users",
        message:
          Object.values(error.response?.data?.errors?.[0] || {})[0] ||
          "Unknown error",
      })
    );
  } finally {
    yield put(setSearchUsersRequestStarted(false));
  }
}

export function errorUsersWorker({
  payload,
}: ReturnType<typeof setSearchUsersRequestError>) {
  if (payload !== false)
    AlertService.alert({
      title: payload.title,
      message: payload.message,
      severity: "error",
    });
}
