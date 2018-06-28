import * as React from 'react';
import { AppBar, Tabs, Tab } from '@material-ui/core';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { Context } from '../../../services/router';
import { history } from '../../../router/history';

interface Props {
  dispatch: Dispatch<any>;
  location: Context;
}

const WALLET = '/wallet';
const BLOCKCHAIN = '/blockchain';

function getPathNumber(pathname: string): number {
  switch (pathname) {
    case WALLET:
      return 0;
    case BLOCKCHAIN:
      return 1;
    default:
      // tslint:disable-next-line:no-magic-numbers
      return 3;
  }
}

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
        </Tabs>
      </AppBar>
    );
  }
}

const mapStateToProps = (state: {}) => {
  return { state };
};

export const Header = connect(mapStateToProps)(CreateHeader);
