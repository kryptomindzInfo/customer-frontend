import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the mainHeader state domain
 */

const selectMainHeaderDomain = state => state.mainHeader || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MainHeader
 */

const makeSelectMainHeader = () =>
  createSelector(
    selectMainHeaderDomain,
    substate => substate,
  );

export default makeSelectMainHeader;
export { selectMainHeaderDomain };
