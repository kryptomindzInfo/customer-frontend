/*
 *
 * BillPaymentsBillList reducer
 *
 */
import produce from 'immer';
import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_ALL_MERCHANTS_LIST_RES } from './constants';

export const initialState = fromJS({
  merchantsList: {},
});

/* eslint-disable default-case, no-param-reassign */
const billPaymentsBillListReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case GET_ALL_MERCHANTS_LIST_RES:
        state.set('merchantsList', fromJS(action.response));

      case DEFAULT_ACTION:
        break;
    }
  });

export default billPaymentsBillListReducer;



// function userProfileReducer(state = initialState, action) {
  // export default userProfileReducer;
