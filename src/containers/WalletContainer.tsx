import * as React from 'react';
import idx from 'idx';
import { history } from '../router/history';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { UserState } from '../reducers/user';
import { Props as RouteProps } from '../services/router';
import { getBalance } from '../actions/user';
import { Transfer } from '../components/ui/modules/Transfer';
import { Balance } from '../components/ui/modules/Balance';
import { TransactionState } from '../reducers/transaction';

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  address: string;
  balance: string;
  token: string;
  transaction: any;
}

interface State {
  user: UserState;
  transaction: TransactionState;
}

class CreateWallet extends React.PureComponent<Props, {}> {
  componentWillMount() {
    const { address, dispatch } = this.props;
    // TODO: ルータ側で判定する
    // TODO: 存在する address かどうかを確認する(要 blockchain 変更)
    if (!address) {
      history.push('/');
    }

    dispatch(getBalance(address));
  }

  componentWillReceiveProps(nextProps: Props) {
    const { dispatch, address } = nextProps;
    const nextBlockIndex = idx(nextProps.transaction, (_: any) => _.index);
    const blockIndex = idx(this.props.transaction, (_: any) => _.index);
    if (nextBlockIndex !== blockIndex) {
      confirm('送金しました');
      dispatch(getBalance(address));
    }
  }

  render() {
    const { balance, address, token } = this.props;
    return (
      <div>
        <Balance balance={balance} />
        <Transfer address={address} token={token} />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const {
    user: {
      account: { address },
      balance,
      token,
    },
    transaction: { transaction },
  } = state;
  return { address, balance, token, transaction };
};

export const WalletContainer = connect(mapStateToProps)(CreateWallet);
