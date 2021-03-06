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

export const { createTransaction } = createActions({
  [constant.CREATE_TRANSACTION]: (res: any) => ({
    transaction: res,
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
