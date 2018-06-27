import { handleActions } from 'redux-actions';
import { api as constant } from '../constant';
import { Account } from '../actions/user';

export interface UserState {
  token?: string;
  account?: Account;
}

export const initialState: UserState = {
  token: null,
  account: {
    address: null,
  },
};

export const user = handleActions(
  {
    [constant.GET_TOKEN]: (state, action) => ({
      ...state,
      token: action.payload.token,
    }),
    [constant.CREATE_ACCOUNT]: (state, action) => ({
      ...state,
      account: action.payload.account,
    }),
  },
  initialState,
);
