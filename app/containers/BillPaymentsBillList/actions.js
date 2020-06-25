/*
 *
 * BillPaymentsBillList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ALL_MERCHANTS_LIST,
  GET_ALL_MERCHANTS_LIST_RES,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAllMerchantsList() {
  return {
    type: GET_ALL_MERCHANTS_LIST,
  };
}

export function getAllMerchantsListRes(response) {
  return {
    type: GET_ALL_MERCHANTS_LIST_RES,
    response,
  };
}
