import { SagaIterator } from "redux-saga";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  runLogin,
  setAccessToken,
  setExpires,
  setLoginRequestError,
  setLoginRequestFinished,
  setLoginRequestStarted,
  setRefreshToken,
} from "./action";
import Api from "../../helpers/api/base";
import { TApiLoginResponse } from "../../helpers/api/types/api.types";
import { LOCAL_STORAGE_KEYS } from "../../helpers/localStorage/consts";
import { TApiError } from "../../helpers/api/types/error.types";

export function* userSaga(): SagaIterator<void> {
  yield all([fork(loginWatcher), fork(tokenWatcher)]);
}

export function* loginWatcher(): SagaIterator<void> {
  yield takeLatest(runLogin, loginWorker);
}

export function* tokenWatcher(): SagaIterator<void> {
  yield takeLatest(setAccessToken, tokensWorker);
  yield takeLatest(setRefreshToken, tokensWorker);
}

export function* loginWorker({ payload }: ReturnType<typeof runLogin>) {
  yield all([
    put(setLoginRequestStarted(true)),
    put(setLoginRequestFinished(false)),
    put(setLoginRequestError("")),
  ]);

  try {
    const auth: TApiLoginResponse = yield Api.getInstance().auth.login(payload);

    yield all([
      put(setAccessToken(auth.accessToken)),
      put(setRefreshToken(auth.refreshToken)),
      put(setExpires(Date.now() + auth.expiresIn)),
    ]);

    yield put(setLoginRequestFinished(true));
  } catch (e: unknown) {
    const error = <AxiosError<TApiError>>e;

    yield put(
      setLoginRequestError(
        error?.response?.data.message || "Something went wrong"
      )
    );
  } finally {
    yield put(setLoginRequestStarted(false));
  }
}

export function* tokensWorker({
  type,
  payload,
}: ReturnType<
  typeof setAccessToken | typeof setRefreshToken
>): SagaIterator<void> {
  if (type === setAccessToken.type) {
    yield call(
      [localStorage, localStorage.setItem],
      LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
      payload
    );
  } else if (type === setRefreshToken.type) {
    yield call(
      [localStorage, localStorage.setItem],
      LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
      payload
    );
  }
}

export function* expiresWorker({ payload }: ReturnType<typeof setExpires>) {
  yield call(
    [localStorage, localStorage.setItem],
    LOCAL_STORAGE_KEYS.EXPIRES,
    `${payload}`
  );
}
