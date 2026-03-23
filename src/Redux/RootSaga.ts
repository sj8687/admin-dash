import { all } from "redux-saga/effects";
import postSaga from "./PostSaga";

export default function* rootSaga() {
  yield all([
    postSaga(),
  ]);
}