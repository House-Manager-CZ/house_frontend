import { SagaIterator } from "redux-saga";
import { all, call, fork, put, select, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import {
  runLogin,
  runRefresh,
  setAccessToken,
  setExpires,
  setLoginRequestError,
  setLoginRequestFinished,
  setLoginRequestStarted,
  setRefreshRequestError,
  setRefreshRequestFinished,
  setRefreshRequestStarted,
  setRefreshToken,
} from "./action";
import Api from "../../helpers/api/main.api";
import { TApiLoginResponse } from "../../helpers/api/types/api.types";
import { LOCAL_STORAGE_KEYS } from "../../helpers/localStorage/consts";
import { TApiError } from "../../helpers/api/types/error.types";
import { isTokenExpiredSelector } from "./selectors";

export function* userSaga(): SagaIterator<void> {
  yield all([
    fork(initWatcher),
    fork(refreshWatcher),
    fork(loginWatcher),
    fork(tokenWatcher),
    fork(expiresWatcher),
  ]);
}

export function* initWatcher(): SagaIterator<void> {
  yield call(initWorker);
}

export function* refreshWatcher(): SagaIterator<void> {
  yield takeLatest(runRefresh, refreshWorker);
}

export function* loginWatcher(): SagaIterator<void> {
  yield takeLatest(runLogin, loginWorker);
}

export function* tokenWatcher(): SagaIterator<void> {
  yield takeLatest(setAccessToken, tokensWorker);
  yield takeLatest(setRefreshToken, tokensWorker);
}

export function* expiresWatcher(): SagaIterator<void> {
  yield takeLatest(setExpires, expiresWorker);
}

export function* initWorker(): SagaIterator<void> {
  try {
    const accessToken =
      localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN) || false;
    const refreshToken =
      localStorage.getItem(LOCAL_STORAGE_KEYS.REFRESH_TOKEN) || false;
    const expires =
      parseInt(localStorage.getItem(LOCAL_STORAGE_KEYS.EXPIRES) || "", 10) ||
      false;

    if (accessToken && refreshToken && expires) {
      yield all([
        put(setAccessToken(accessToken)),
        put(setRefreshToken(refreshToken)),
        put(setExpires(expires)),
      ]);

      const tokenExpired: boolean = yield select(isTokenExpiredSelector);

      if (tokenExpired) yield call(refreshWorker);
    }
  } catch (error) {
    //
  }
}

export function* refreshWorker() {
  yield all([
    put(setRefreshRequestStarted(true)),
    put(setRefreshRequestFinished(false)),
    put(setRefreshRequestError("")),
  ]);

  try {
    const refresh: TApiLoginResponse = yield Api.getInstance().auth.refresh();

    yield all([
      put(setAccessToken(refresh.accessToken)),
      put(setRefreshToken(refresh.refreshToken)),
      put(setExpires(Date.now() + refresh.expiresIn)),
    ]);

    yield put(setRefreshRequestFinished(true));
  } catch (e: unknown) {
    const error = <AxiosError<TApiError>>e;

    yield put(
      setRefreshRequestError(
        error?.response?.data.message || "Something went wrong"
      )
    );
  } finally {
    yield put(setRefreshRequestStarted(false));
  }
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

    if (window.PasswordCredential) {
      const credentials = new window.PasswordCredential({
        id: payload.email,
        password: payload.password,
      });

      yield navigator.credentials.store(credentials);
    }

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
    Api.getInstance().setAccessToken(payload);
  } else if (type === setRefreshToken.type) {
    yield call(
      [localStorage, localStorage.setItem],
      LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
      payload
    );
    Api.getInstance().setRefreshToken(payload);
  }
}

export function* expiresWorker({ payload }: ReturnType<typeof setExpires>) {
  yield call(
    [localStorage, localStorage.setItem],
    LOCAL_STORAGE_KEYS.EXPIRES,
    `${payload}`
  );
}
