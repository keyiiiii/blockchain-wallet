import { createActions } from 'redux-actions';
import { Dispatch } from 'redux';
import * as queryString from 'query-string';
import { router, Route } from '../services/router';
import { history } from '../router/history';
import { router as constant } from '../constant';

export const { changeRoute } = createActions({
  [constant.CHANGE_ROUTE]: (route?: Route) => ({
    route,
  }),
});

export function changeRouter() {
  return (dispatch: Dispatch<any>) => {
    async function result() {
      const route = await router.resolve({
        pathname: location.pathname,
        query: queryString.parse(location.search),
      });
      if (route.redirect) {
        history.push(route.redirect, { from: route.from });
      } else {
        dispatch(changeRoute(route));
      }
    }
    result();
  };
}
