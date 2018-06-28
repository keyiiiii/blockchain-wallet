import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { user } from './user';
import { router } from './router';
import { transaction } from './transaction';
import { blockchain } from './blockchain';

export const reducers = combineReducers({
  form: formReducer,
  user,
  router,
  transaction,
  blockchain,
});
