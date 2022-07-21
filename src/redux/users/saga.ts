import { SagaIterator } from "redux-saga";
import { all, fork, put, takeLatest } from "redux-saga/effects";
import {
  runSearchUsers,
  setSearchResults,
  setSearchUsersRequestError,
  setSearchUsersRequestFinished,
  setSearchUsersRequestStarted,
} from "./action";
import Api from "../../helpers/api/main.api";
import { TApiUser } from "../../helpers/api/types/entities.types";

export function* usersSaga(): SagaIterator<void> {
  yield all([fork(searchUsersWatcher)]);
}

export function* searchUsersWatcher(): SagaIterator<void> {
  yield takeLatest(runSearchUsers, searchUsersWorker);
}

export function* searchUsersWorker({
  payload,
}: ReturnType<typeof runSearchUsers>) {
  yield all([
    put(setSearchUsersRequestStarted(true)),
    put(setSearchUsersRequestFinished(false)),
    put(setSearchUsersRequestError("")),
  ]);

  try {
    const searchResults: Array<TApiUser> =
      yield Api.getInstance().users.searchUsers(payload);

    yield put(setSearchResults(searchResults));

    yield put(setSearchUsersRequestFinished(true));
  } catch (error) {
    //
  } finally {
    yield put(setSearchUsersRequestStarted(false));
  }
}
