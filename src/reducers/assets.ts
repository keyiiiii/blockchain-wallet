import { handleActions } from 'redux-actions';
import { api as constant } from '../constant';

export interface AssetsState {
  transaction?: any;
}

export const initialState: AssetsState = {
  transaction: null,
};

export const assets = handleActions(
  {
    [constant.CREATE_ASSETS]: (state, action) => ({
      ...state,
      transaction: action.payload.transaction,
    }),
  },
  initialState,
);
