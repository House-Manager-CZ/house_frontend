import { all, fork } from "redux-saga/effects";
import { userSaga } from "./user";
import { housesSaga } from "./houses";

function* rootSaga() {
  yield all([fork(userSaga), fork(housesSaga)]);
}

export default rootSaga;
