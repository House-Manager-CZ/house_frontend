import { SagaIterator } from "redux-saga";
import { all, call, fork, put, select, takeLatest } from "redux-saga/effects";
import { AxiosError } from "axios";
import * as Sentry from "@sentry/react";
import {
  runGetMeInfo,
  runLogin,
  runLogout,
  runRefresh,
  runRegister,
  setAccessToken,
  setExpires,
  setGetMeInfoRequestError,
  setGetMeInfoRequestFinished,
  setGetMeInfoRequestStarted,
  setLoginRequestError,
  setLoginRequestFinished,
  setLoginRequestStarted,
  setRefreshRequestError,
  setRefreshRequestFinished,
  setRefreshRequestStarted,
  setRefreshToken,
  setRegisterRequestError,
  setRegisterRequestFinished,
  setRegisterRequestStarted,
  setUserInfo,
} from "./action";
import Api from "../../helpers/api/main.api";
import { TApiLoginResponse } from "../../helpers/api/types/api.types";
import { LOCAL_STORAGE_KEYS } from "../../helpers/localStorage/consts";
import { TApiError } from "../../helpers/api/types/error.types";
import { isLoggedInSelector, isTokenExpiredSelector } from "./selectors";
import { checkUserData } from "../../helpers/user";
import { TApiUser } from "../../helpers/api/types/entities.types";
import { waitFor } from "../../helpers/saga/effects";

export function* userSaga(): SagaIterator<void> {
  yield all([
    fork(initWatcher),
    fork(loginWatcher),
    fork(refreshWatcher),
    fork(registerWatcher),
    fork(tokenWatcher),
    fork(expiresWatcher),
    fork(logoutWatcher),
    fork(getMeInfoWatcher),
  ]);
}

export function* initWatcher(): SagaIterator<void> {
  yield call(initWorker);
}

export function* loginWatcher(): SagaIterator<void> {
  yield takeLatest(runLogin, loginWorker);
}

export function* refreshWatcher(): SagaIterator<void> {
  yield takeLatest(runRefresh, refreshWorker);
}

export function* registerWatcher(): SagaIterator<void> {
  yield takeLatest(runRegister, registerWorker);
}

export function* tokenWatcher(): SagaIterator<void> {
  yield takeLatest(setAccessToken, tokensWorker);
  yield takeLatest(setRefreshToken, tokensWorker);
}

export function* expiresWatcher(): SagaIterator<void> {
  yield takeLatest(setExpires, expiresWorker);
}

export function* logoutWatcher(): SagaIterator<void> {
  yield takeLatest(runLogout, logoutWorker);
}

export function* getMeInfoWatcher(): SagaIterator<void> {
  yield takeLatest(runGetMeInfo, getMeInfoWorker);
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

    yield call(waitFor, isLoggedInSelector);

    const userData =
      localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA) || false;

    if (userData && checkUserData(JSON.parse(userData))) {
      yield put(setUserInfo(JSON.parse(userData)));
    } else {
      yield put(runGetMeInfo());
    }
  } catch (error) {
    //
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

    yield put(runGetMeInfo());
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

    yield all([
      put(setAccessToken(false)),
      put(setRefreshToken(false)),
      put(setExpires(false)),
    ]);
  } finally {
    yield put(setRefreshRequestStarted(false));
  }
}

export function* registerWorker({ payload }: ReturnType<typeof runRegister>) {
  yield all([
    put(setRegisterRequestStarted(true)),
    put(setRegisterRequestFinished(false)),
    put(setRegisterRequestError("")),
  ]);

  try {
    const register: TApiLoginResponse = yield Api.getInstance().auth.register(
      payload
    );

    yield all([
      put(setAccessToken(register.accessToken)),
      put(setRefreshToken(register.refreshToken)),
      put(setExpires(Date.now() + register.expiresIn)),
    ]);

    if (window.PasswordCredential) {
      const credentials = new window.PasswordCredential({
        id: payload.email,
        password: payload.password,
      });

      yield navigator.credentials.store(credentials);
    }

    yield put(setRegisterRequestFinished(true));
  } catch (e: unknown) {
    const error = <AxiosError<TApiError>>e;

    yield put(
      setRegisterRequestError(
        error?.response?.data.message || "Something went wrong"
      )
    );
  } finally {
    yield put(setRegisterRequestStarted(false));
  }
}

export function* tokensWorker({
  type,
  payload,
}: ReturnType<
  typeof setAccessToken | typeof setRefreshToken
>): SagaIterator<void> {
  if (type === setAccessToken.type && payload !== false) {
    yield call(
      [localStorage, localStorage.setItem],
      LOCAL_STORAGE_KEYS.ACCESS_TOKEN,
      payload
    );
    Api.getInstance().setAccessToken(payload);
  } else if (type === setRefreshToken.type && payload !== false) {
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

export function* logoutWorker() {
  yield all([
    put(setAccessToken(false)),
    put(setRefreshToken(false)),
    put(setExpires(false)),
    put(setUserInfo(false)),
  ]);
  yield call(
    [localStorage, localStorage.removeItem],
    LOCAL_STORAGE_KEYS.ACCESS_TOKEN
  );
  yield call(
    [localStorage, localStorage.removeItem],
    LOCAL_STORAGE_KEYS.REFRESH_TOKEN
  );
  yield call(
    [localStorage, localStorage.removeItem],
    LOCAL_STORAGE_KEYS.EXPIRES
  );
  yield call(
    [localStorage, localStorage.removeItem],
    LOCAL_STORAGE_KEYS.USER_DATA
  );
}

export function* getMeInfoWorker() {
  yield all([
    put(setGetMeInfoRequestStarted(true)),
    put(setGetMeInfoRequestFinished(false)),
    put(setGetMeInfoRequestError("")),
  ]);

  try {
    const meInfo: TApiUser = yield Api.getInstance().users.getMe();

    yield all([
      call(
        [localStorage, localStorage.setItem],
        LOCAL_STORAGE_KEYS.USER_DATA,
        JSON.stringify(meInfo)
      ),
      put(setUserInfo(meInfo)),
    ]);

    Sentry.configureScope((scope) => {
      scope.setUser({
        id: `${meInfo.id}`,
        email: meInfo.email,
        username: meInfo.username,
      });
    });

    yield put(setGetMeInfoRequestFinished(true));
  } catch (e: unknown) {
    const error = <AxiosError<TApiError>>e;

    yield put(
      setRegisterRequestError(
        error?.response?.data.message || "Something went wrong"
      )
    );
  } finally {
    yield put(setGetMeInfoRequestStarted(false));
  }
}
