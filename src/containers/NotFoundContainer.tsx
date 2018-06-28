import * as React from 'react';
import { Props as RouteProps } from '../services/router';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

type Props = {
  dispatch: Dispatch<any>;
} & RouteProps;

type State = {};

class CreateNotFoundContainer extends React.PureComponent<Props, {}> {
  render() {
    return <div>NotFound</div>;
  }
}

const mapStateToProps = (state: State) => {
  return state;
};

export const NotFoundContainer = connect(mapStateToProps)(
  CreateNotFoundContainer,
);
