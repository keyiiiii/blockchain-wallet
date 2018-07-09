import * as React from 'react';
import idx from 'idx';
import { history } from '../router/history';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { UserState } from '../reducers/user';
import { Props as RouteProps } from '../services/router';
import { getBalance } from '../actions/user';
import { Transfer } from '../components/modules/Transfer';
import { Balance } from '../components/modules/Balance';
import { TransactionState } from '../reducers/transaction';
import { Address } from '../components/modules/Address';
import { AssetsList } from '../components/modules/AssetsList';
import { AssetsSelect } from '../components/modules/AssetsSelect';
import { Assets, getAssets } from '../actions/assets';
import { AssetsState } from '../reducers/assets';

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  address: string;
  balance: number;
  token: string;
  transaction: any;
  assets: Assets;
}

interface State {
  user: UserState;
  transaction: TransactionState;
  assets: AssetsState;
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
    dispatch(getAssets(address));
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
    const { balance, address, token, assets } = this.props;
    return (
      <div>
        <Address address={address} />
        <AssetsList assets={assets} />
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
    assets: { assets },
  } = state;
  return { address, balance, token, transaction, assets };
};

export const WalletContainer = connect(mapStateToProps)(CreateWallet);
