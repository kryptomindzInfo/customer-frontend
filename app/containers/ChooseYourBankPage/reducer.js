/*
 *
 * ChooseYourBankPage reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION } from './constants';

export const initialState = {
	loading: true
};

/* eslint-disable default-case, no-param-reassign */
const chooseYourBankPageReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
    }
  });

export default chooseYourBankPageReducer;
