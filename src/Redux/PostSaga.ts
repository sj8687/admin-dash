import { call, put, takeLatest } from "redux-saga/effects";
import { fetchPartnerDocs, getPartnersAPI, loginAPI, logoutAPI, verifyPartnerDocsAPI, } from "./Api";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  logoutRequest,
  getPartnersRequest,
  getPartnersSuccess,
  getPartnersFailure,
  getPartnerDocsSuccess,
  getPartnerDocsFailure,
  getPartnerDocsRequest,
  verifyPartnerDocsSuccess,
  verifyPartnerDocsFailure,
  verifyPartnerDocsRequest,

} from "./PostSlice";
import type { SagaIterator } from "redux-saga";




function* handleLogin(action: any): any {
  try {
    const data = yield call(loginAPI, action.payload.email);

    if (data.status === "success") {
      yield put(loginSuccess(data.message));
    } else {
      yield put(loginFailure("Login failed"));
    }
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}


function* handleLogout(): any {
  try {
    const data = yield call(logoutAPI);

    if (data.status === "success") {
      yield put(logoutSuccess(data.message));
    } else {
      yield put(logoutFailure("Logout failed"));
    }

  } catch (error: any) {
    yield put(logoutFailure(error.message));
  }
}



function* handleGetPartners(): any {
  try {
    const data = yield call(getPartnersAPI);

    const partners = data?.data?.items ?? [];

    yield put(getPartnersSuccess(partners));
  } catch (error: any) {
    yield put(getPartnersFailure(error.message));
  }
}


function* handleGetPartnerDocs(action: any): any {
  try {
    const docs = yield call(fetchPartnerDocs, action.payload);

    yield put(getPartnerDocsSuccess(docs));
  } catch (error: any) {
    yield put(getPartnerDocsFailure(error.message));
  }
}


function* handleVerifyPartnerDocs(action: any): any {
  try {
    const { partnerId, payload } = action.payload;

    yield call(verifyPartnerDocsAPI, partnerId, payload);

    yield put(verifyPartnerDocsSuccess());
  } catch (error: any) {
    yield put(verifyPartnerDocsFailure(error.message));
  }
}


export default function* postSaga(): SagaIterator {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(logoutRequest.type, handleLogout);
  yield takeLatest(getPartnersRequest.type, handleGetPartners);
  yield takeLatest(getPartnerDocsRequest.type, handleGetPartnerDocs);
  yield takeLatest(verifyPartnerDocsRequest.type, handleVerifyPartnerDocs);

}


