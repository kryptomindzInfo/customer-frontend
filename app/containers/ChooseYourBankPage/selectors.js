import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chooseYourBankPage state domain
 */

const selectChooseYourBankPageDomain = state =>
  state.chooseYourBankPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChooseYourBankPage
 */

const makeSelectChooseYourBankPage = () =>
  createSelector(
    selectChooseYourBankPageDomain,
    substate => substate,
  );

export default makeSelectChooseYourBankPage;
export { selectChooseYourBankPageDomain };
