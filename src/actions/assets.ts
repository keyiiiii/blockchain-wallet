import { Dispatch } from 'redux';
import { createActions } from 'redux-actions';
import { api as constant } from '../constant';
import { apiUrl } from '../config';

interface AssetsPayload {
  from: string;
  seed: string;
  name: string;
  description: string;
  total: number;
  decimals: number;
}

export const { createAssets } = createActions({
  [constant.CREATE_ASSETS]: (res: any) => ({
    transaction: res,
  }),
});

export function postAssets(body: AssetsPayload) {
  return (dispatch: Dispatch<any>) => {
    fetch(`${apiUrl}/assets/issue`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...body }),
    })
      .then((result: any) => result.json())
      .then((assets: Account) => {
        dispatch(createAssets(assets));
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: token 発行に失敗しました');
      });
  };
}
