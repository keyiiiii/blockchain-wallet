import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { user } from './user';
import { router } from './router';
import { transaction } from './transaction';

export const reducers = combineReducers({
  form: formReducer,
  user,
  router,
  transaction,
});
