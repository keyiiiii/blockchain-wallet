import { applyMiddleware, createStore } from 'redux';
import { reducers } from './reducers';
import thunk from 'redux-thunk';
// import { storageKeys } from './constant';
// import { localData } from './utils/storage';

// loginデータを Store の初期値に保存
// const login = {
//   token: localData.get(storageKeys.TOKEN) || '',
// };
//
// const initialState = {
//   session: { login },
// };

export const store = createStore(
  reducers,
  // initialState,
  applyMiddleware(thunk),
);
