import { handleActions } from 'redux-actions';
import { api as constant } from '../constant';
import { Assets } from '../actions/assets';

export interface AssetsState {
  transaction?: any;
  assets?: Assets;
}

export const initialState: AssetsState = {
  transaction: null,
  assets: null,
};

export const assets = handleActions(
  {
    [constant.CREATE_ASSETS]: (state, action) => ({
      ...state,
      transaction: action.payload.transaction,
    }),
    [constant.READ_ASSETS]: (state, action) => ({
      ...state,
      assets: action.payload.assets,
    }),
  },
  initialState,
);
