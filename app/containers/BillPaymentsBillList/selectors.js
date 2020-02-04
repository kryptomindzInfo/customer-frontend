import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the billPaymentsBillList state domain
 */

const selectBillPaymentsBillListDomain = state =>
  state.billPaymentsBillList || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BillPaymentsBillList
 */

const makeSelectBillPaymentsBillList = () =>
  createSelector(
    selectBillPaymentsBillListDomain,
    substate => substate,
  );

export default makeSelectBillPaymentsBillList;
export { selectBillPaymentsBillListDomain };
