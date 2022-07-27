import { all, fork } from "redux-saga/effects";
import { usersSaga } from "./users";
import { userSaga } from "./user";
import { housesSaga } from "./houses";
import { eventsSaga } from "./events";

function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(housesSaga),
    fork(usersSaga),
    fork(eventsSaga),
  ]);
}

export default rootSaga;
