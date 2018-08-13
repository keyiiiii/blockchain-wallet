import { handleActions } from 'redux-actions';
import { api as constant } from '../constant';

export interface TransactionState {
  transaction?: any;
  swapOrder?: any;
}

export const initialState: TransactionState = {
  transaction: null,
  swapOrder: null,
};

export const transaction = handleActions(
  {
    [constant.CREATE_TRANSACTION]: (state, action) => ({
      ...state,
      transaction: action.payload.transaction,
    }),
    [constant.CREATE_SWAP_ORDER]: (state, action) => ({
      ...state,
      swapOrder: action.payload.swapOrder,
    }),
  },
  initialState,
);
