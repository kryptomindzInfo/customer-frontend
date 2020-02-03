import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the billPaymentsPage state domain
 */

const selectBillPaymentsPageDomain = state =>
  state.billPaymentsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BillPaymentsPage
 */

const makeSelectBillPaymentsPage = () =>
  createSelector(
    selectBillPaymentsPageDomain,
    substate => substate,
  );

export default makeSelectBillPaymentsPage;
export { selectBillPaymentsPageDomain };
