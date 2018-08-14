import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';
import { api as constant } from '../constant';
import { apiUrl } from '../config';
import { apiClient } from '../services/apiClient';

interface Optional {
  transferable?: boolean;
  levy?: boolean;
  cashback?: boolean;
}

export interface AssetsForm {
  name: string;
  description: string;
  total: number;
  decimals: number;
  optional: Optional;
}

interface AssetsPayload extends AssetsForm {
  from: string;
  seed: string;
}

export interface Asset {
  id: string;
  name: string;
  description: string;
  total: number;
  decimals: number;
}

export type Assets = Asset[];

export const {
  createAssets,
  readAssets,
  readAssetsList,
  readAsset,
} = createActions({
  [constant.CREATE_ASSETS]: (res: any) => ({
    transaction: res,
  }),
  [constant.READ_ASSETS]: (res: Assets) => ({
    assets: res,
  }),
  [constant.READ_ASSETS_LIST]: (res: Assets) => ({
    assetsList: res,
  }),
  [constant.READ_ASSET]: (res: Asset) => ({
    asset: res,
  }),
});

export function postAssets(body: AssetsPayload) {
  return (dispatch: Dispatch<any>) => {
    apiClient(`${apiUrl}/assets/issue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    })
      .then((assets: Account) => {
        dispatch(createAssets(assets));
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: token 発行に失敗しました');
      });
  };
}

export function getAssets(address: string) {
  return (dispatch: Dispatch<any>) => {
    apiClient(`${apiUrl}/assets/list/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((assets: Assets) => {
        dispatch(readAssets(assets));
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: token の取得に失敗しました');
      });
  };
}

export function getAssetsList() {
  return (dispatch: Dispatch<any>) => {
    apiClient(`${apiUrl}/assets/list`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((assets: Assets) => {
        dispatch(readAssetsList(assets));
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: token リストの取得に失敗しました');
      });
  };
}

export function getAsset(assetId: string) {
  return (dispatch: Dispatch<any>) => {
    apiClient(`${apiUrl}/assets/${assetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((asset: Asset) => {
        dispatch(readAsset(asset));
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: token リストの取得に失敗しました');
      });
  };
}
