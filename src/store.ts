import { applyMiddleware, createStore } from 'redux';
import { reducers } from './reducers';
import thunk from 'redux-thunk';
import { storageKeys } from './constant';
import { localData } from './utils/storage';

// loginデータを Store の初期値に保存
const initialState = {
  user: {
    token: localData.get(storageKeys.TOKEN) || '',
    account: {
      address: localData.get(storageKeys.ADDRESS) || '',
    }
  },
};

export const store = createStore(
  reducers,
  initialState,
  applyMiddleware(thunk),
);
