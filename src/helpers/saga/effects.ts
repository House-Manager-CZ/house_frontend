import { select, take } from "redux-saga/effects";
import { Selector } from "react-redux";

export function* waitFor(selector: Selector<any, any>) {
  // @ts-ignore
  if (yield select(selector)) return;

  while (true) {
    yield take("*");
    // @ts-ignore
    if (yield select(selector)) return;
  }
}
