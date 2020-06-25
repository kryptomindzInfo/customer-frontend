// import { take, call, put, select } from 'redux-saga/effects';

import { call, put, takeEvery } from 'redux-saga/effects';
import { getRequest, postRequest, postRequestMultipart } from 'utils/request';

import { GET_ALL_MERCHANTS_LIST } from './constants';
import { getAllMerchantsListRes } from './actions';
import history from 'utils/history';

// Individual exports for testing
export function* billPaymentsBillListSaga() {
  // See example in containers/HomePage/saga.js
}

export function* getAllMerchantsListSaga() {
  try {
    const response = yield call(getRequest, `user/listMerchants`);
    console.log('called: user/listMerchants (response)', response);
    if (response.code == 1) {
      yield put(getAllMerchantsListRes(response));
    }
  } catch {}
}

export default function* watchAll() {
  yield takeEvery(GET_ALL_MERCHANTS_LIST, getAllMerchantsListSaga);
}
