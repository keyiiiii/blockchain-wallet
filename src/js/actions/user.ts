import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';
import { api as constant, storageKeys } from '../constant';
import { localData } from '../utils/storage';
import { apiUrl } from '../config';

export interface Account {
  address: string;
}

export const {
  createAccount,
  getToken,
} = createActions({
  [constant.CREATE_ACCOUNT]: (res: Account) => ({
    account: res,
  }),
  [constant.GET_TOKEN]: (res: string) => ({
    token: res,
  }),
});

// tokenを localStorage に保存
// FIXME: 一旦 seed = token にしてある。危険
function setToken2LocalData(token: string, account: Account): void {
  localData.set(storageKeys.TOKEN, token);
  localData.set(storageKeys.ADDRESS, account.address);
}

export function postAccount(seed: string) {
  return (dispatch: Dispatch<any>) => {
    fetch(`${apiUrl}/account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({seed}),
    })
      .then((result: any) => result.json())
      .then((account: Account) => {
        setToken2LocalData(seed, account);
        dispatch(getToken(seed));
        dispatch(createAccount(account));
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };
}
