import * as React from 'react';
import { Route } from '../services/router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { changeRouter } from '../actions/router';
import { history } from '../router/history';
import { RouterState } from '../reducers/router';

interface Props {
  route: Route;
  dispatch: Dispatch<any>;
  error: Error;
}

interface ReducerState {
  router: RouterState;
}

export class CreateAppContainer extends React.PureComponent<Props, {}> {
  componentWillMount() {
    const { dispatch }: Props = this.props;
    dispatch(changeRouter());
  }

  componentDidMount() {
    history.listen(() => {
      const { dispatch }: Props = this.props;
      dispatch(changeRouter());
    });
  }

  render() {
    const { route }: Props = this.props;
    if (route && route.Container) {
      const { Container, location } = route;
      return (
        <div>
          <Container location={location} />
        </div>
      );
    }
    return <div>loading...</div>;
  }
}

const mapStateToProps = (state: ReducerState) => {
  const {
    router: { route },
  } = state;
  return { route };
};

export const AppContainer = connect(mapStateToProps)(CreateAppContainer);
