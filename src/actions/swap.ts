import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';
import { api as constant } from '../constant';
import { apiClient } from '../services/apiClient';
import { apiUrl } from '../config';

interface OrderAssetPayload {
  assetId: string;
  value: string;
}

interface SwapOrderPayload {
  from: string;
  seed: string;
  sell: OrderAssetPayload;
  buy: OrderAssetPayload;
}

interface Asset {
  assetId: string;
  value: number;
}

export interface Escrow {
  escrowId: string;
  from: string;
  sell: Asset;
  buy: Asset;
  timestamp: string;
}

export const { createSwapOrder, readSwaps } = createActions({
  [constant.CREATE_SWAP_ORDER]: (res: any) => ({
    swapOrder: res,
  }),
  [constant.READ_SWAPS]: (swaps: Escrow[]) => ({
    swaps,
  }),
});

export function postSwapOrder(body: SwapOrderPayload) {
  return (dispatch: Dispatch<any>) => {
    apiClient(`${apiUrl}/swap/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    })
      .then((swap: any) => {
        dispatch(createSwapOrder(swap));
      })
      .catch((err: Error) => {
        if (err.message === '400') {
          alert('error: 入力を確認してください');
        } else if (err.message === '405') {
          alert('error: 譲渡許可が制限されたトークンです');
        } else {
          alert('error: 残高が足りません');
        }
      });
  };
}

export function getSwaps(address: string) {
  return (dispatch: Dispatch<any>) => {
    apiClient(`${apiUrl}/swap/list/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((swaps: Escrow[]) => {
        dispatch(readSwaps(swaps));
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: swap list の取得に失敗しました');
      });
  };
}
