import * as React from 'react';
import { history } from '../router/history';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { UserState } from '../reducers/user';
import { Props as RouteProps } from '../services/router';
import { Transfer } from '../components/ui/modules/Transfer';
import { Balance } from '../components/ui/modules/Balance';

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  address: string;
}

interface State {
  user: UserState;
}

class CreateWallet extends React.PureComponent<Props, {}> {
  componentWillMount() {
    const { address } = this.props;
    // TODO: ルータ側で判定する
    // TODO: 存在する address かどうかを確認する(要 blockchain 変更)
    if (!address) {
      history.push('/');
    }
  }

  render() {
    return (
      <div>
        <Balance />
        <Transfer />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const {
    user: {
      account: { address },
    },
  } = state;
  return { address };
};

export const WalletContainer = connect(mapStateToProps)(CreateWallet);
