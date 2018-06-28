import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { user } from './user';
import { router } from './router';

export const reducers = combineReducers({
  form: formReducer,
  user,
  router,
});
