import { handleActions } from 'redux-actions';
import { api as constant } from '../constant';

export interface TransactionState {
  transaction?: any;
}

export const initialState: TransactionState = {
  transaction: null,
};

export const transaction = handleActions(
  {
    [constant.CREATE_TRANSACTION]: (state, action) => ({
      ...state,
      transaction: action.payload.transaction,
    }),
  },
  initialState,
);
