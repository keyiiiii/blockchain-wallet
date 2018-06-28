import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';
import { api as constant } from '../constant';
import { apiUrl } from '../config';

export const { readChain } = createActions({
  [constant.READ_CHAIN]: (res: any) => ({
    blockchain: res,
  }),
});

export function getChain() {
  return (dispatch: Dispatch<any>) => {
    fetch(`${apiUrl}/chain`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result: any) => result.json())
      .then((blockchain: any) => {
        dispatch(readChain(blockchain));
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: 取得できませんでした');
      });
  };
}
