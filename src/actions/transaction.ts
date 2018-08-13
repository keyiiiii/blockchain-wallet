import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';
import { api as constant } from '../constant';
import { apiUrl } from '../config';
import { Account } from './user';
import { apiClient } from '../services/apiClient';

interface TransferPayload {
  seed: string;
  from: string;
  to: string;
  value: string;
  assetId?: string;
  message?: string;
}

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

export const { createTransaction, createSwapOrder } = createActions({
  [constant.CREATE_TRANSACTION]: (res: any) => ({
    transaction: res,
  }),
  [constant.CREATE_SWAP_ORDER]: (res: any) => ({
    swapOrder: res,
  }),
});

export function postTransaction(body: TransferPayload) {
  return (dispatch: Dispatch<any>) => {
    apiClient(`${apiUrl}/transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    })
      .then((transaction: Account) => {
        dispatch(createTransaction(transaction));
      })
      .catch((err: Error) => {
        if (err.message === '400') {
          alert('error: 送金先を確認してください');
        } else if (err.message === '405') {
          alert('error: 譲渡許可が制限されたトークンです');
        } else {
          alert('error: 残高が足りません');
        }
      });
  };
}

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
          alert('error: 送金先を確認してください');
        } else if (err.message === '405') {
          alert('error: 譲渡許可が制限されたトークンです');
        } else {
          alert('error: 残高が足りません');
        }
      });
  };
}
