import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the uploadDocumentsPage state domain
 */

const selectUploadDocumentsPageDomain = state =>
  state.uploadDocumentsPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by UploadDocumentsPage
 */

const makeSelectUploadDocumentsPage = () =>
  createSelector(
    selectUploadDocumentsPageDomain,
    substate => substate,
  );

export default makeSelectUploadDocumentsPage;
export { selectUploadDocumentsPageDomain };
