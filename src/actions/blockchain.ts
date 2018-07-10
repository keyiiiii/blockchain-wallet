import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';
import { api as constant } from '../constant';
import { apiUrl } from '../config';
import { apiClient } from '../services/apiClient';

export const { readChain } = createActions({
  [constant.READ_CHAIN]: (res: any) => ({
    blockchain: res,
  }),
});

export function getChain() {
  return (dispatch: Dispatch<any>) => {
    apiClient(`${apiUrl}/chain`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((blockchain: any) => {
        dispatch(readChain(blockchain));
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: 取得できませんでした');
      });
  };
}
