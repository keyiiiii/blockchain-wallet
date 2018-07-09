import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';
import { api as constant } from '../constant';
import { apiUrl } from '../config';
import { Account } from './user';

interface TransactionPayload {
  seed: string;
  from: string;
  to: string;
  value: string;
  assetId?: string;
}

export const { createTransaction } = createActions({
  [constant.CREATE_TRANSACTION]: (res: any) => ({
    transaction: res,
  }),
});

export function postTransaction(body: TransactionPayload) {
  return (dispatch: Dispatch<any>) => {
    fetch(`${apiUrl}/transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    })
      .then((result: any) => result.json())
      .then((transaction: Account) => {
        dispatch(createTransaction(transaction));
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: 残高が足りません');
      });
  };
}
