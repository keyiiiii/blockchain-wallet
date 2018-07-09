import * as React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Context } from '../../services/router';
import { history } from '../../router/history';

interface Props {
  dispatch: Dispatch<any>;
  location: Context;
}

const WALLET = '/wallet';
const BLOCKCHAIN = '/blockchain';
const TOKEN_GENERATION = '/tokens';

// tslint:disable:no-magic-numbers
function getPathNumber(pathname: string): number {
  switch (pathname) {
    case BLOCKCHAIN:
      return 1;
    case TOKEN_GENERATION:
      return 2;
    default:
      return 0;
  }
}
// tslint:enable:no-magic-numbers

class CreateHeader extends React.PureComponent<Props, {}> {
  customLink(to: string) {
    history.push(to);
  }

  render() {
    const {
      location: { pathname },
    } = this.props;
    const index = getPathNumber(pathname);

    return (
      <AppBar position="static" color="default">
        <Tabs
          value={index}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="wallet" onClick={this.customLink.bind(this, WALLET)} />
          <Tab
            label="blockchain"
            onClick={this.customLink.bind(this, BLOCKCHAIN)}
          />
          <Tab
            label="token generation"
            onClick={this.customLink.bind(this, TOKEN_GENERATION)}
          />
        </Tabs>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: {}) => {
  return { state };
};

export const Header = connect(mapStateToProps)(CreateHeader);
