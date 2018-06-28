import { handleActions } from 'redux-actions';
import { router as constant } from '../constant';
import { Route } from '../services/router';

export type RouterState = {
  route?: Route;
};

const initialState: RouterState = {
  route: null,
};

export const router = handleActions(
  {
    [constant.CHANGE_ROUTE]: (state, action) => ({
      ...state,
      route: action.payload.route,
    }),
  },
  initialState,
);
