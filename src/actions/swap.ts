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

export const { createSwapOrder } = createActions({
  [constant.CREATE_SWAP_ORDER]: (res: any) => ({
    swapOrder: res,
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
          alert('error: 送金先を確認してください');
        } else if (err.message === '405') {
          alert('error: 譲渡許可が制限されたトークンです');
        } else {
          alert('error: 残高が足りません');
        }
      });
  };
}
