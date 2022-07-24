import { all, fork } from "redux-saga/effects";
import { usersSaga } from "./users";
import { userSaga } from "./user";
import { housesSaga } from "./houses";

function* rootSaga() {
  yield all([fork(userSaga), fork(housesSaga), fork(usersSaga)]);
}

export default rootSaga;
