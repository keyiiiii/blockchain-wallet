import { handleActions } from 'redux-actions';
import { api as constant } from '../constant';
import { Assets, Asset } from '../actions/assets';

export interface AssetsState {
  transaction?: any;
  assets?: Assets;
  assetsList?: Assets;
  asset?: Asset;
}

export const initialState: AssetsState = {
  transaction: null,
  assets: null,
  assetsList: null,
  asset: null,
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
    [constant.READ_ASSETS_LIST]: (state, action) => ({
      ...state,
      assetsList: action.payload.assetsList,
    }),
    [constant.READ_ASSET]: (state, action) => ({
      ...state,
      asset: action.payload.asset,
    }),
  },
  initialState,
);
