import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the otpForgotPassword state domain
 */

const selectOtpForgotPasswordDomain = state =>
  state.otpForgotPassword || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OtpForgotPassword
 */

const makeSelectOtpForgotPassword = () =>
  createSelector(
    selectOtpForgotPasswordDomain,
    substate => substate,
  );

export default makeSelectOtpForgotPassword;
export { selectOtpForgotPasswordDomain };
