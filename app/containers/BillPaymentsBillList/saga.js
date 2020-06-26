// import { take, call, put, select } from 'redux-saga/effects';

import { call, put, takeEvery } from 'redux-saga/effects';
import { getRequest, postRequest, postRequestMultipart } from 'utils/request';

import { GET_ALL_MERCHANTS_LIST } from './constants';
import { getAllMerchantsListRes } from './actions';
import history from 'utils/history';

// Individual exports for testing
// export function* billPaymentsBillListSaga() {
// }

function* getAllMerchantsListSaga() {
  console.log('inside saga of getAllMerchantsList');

  try {
    const response = yield call(getRequest, `user/listMerchants`);
    console.log('called: user/listMerchants (response)', response);
    if (response.status == 1) {
      yield put(getAllMerchantsListRes(response));
    }
  } catch {}
}

export default function* billPaymentsBillListSaga() {
  yield takeEvery(GET_ALL_MERCHANTS_LIST, getAllMerchantsListSaga);
}
