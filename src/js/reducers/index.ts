import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { user } from './user';

export const reducers = combineReducers({
  form: formReducer,
  user,
});
