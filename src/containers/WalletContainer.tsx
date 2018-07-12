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
import { FormState, FormStateMap } from 'redux-form/lib/reducer';
import { FormErrors } from 'redux-form';

interface SyncErrors {
  syncErrors?: FormErrors<FormData>;
}

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  address: string;
  balance: number;
  token: string;
  transaction: any;
  assets: Assets;
  assetsSelect: FormState & SyncErrors;
}

interface State {
  user: UserState;
  transaction: TransactionState;
  assets: AssetsState;
  form: FormStateMap;
}

class CreateWallet extends React.PureComponent<Props, {}> {
  private assetName = 'assetName';

  componentWillMount() {
    const { address, dispatch } = this.props;
    // TODO: ルータ側で判定する
    // TODO: 存在する address かどうかを確認する(要 blockchain 変更)
    if (!address) {
      history.push('/');
    }

    dispatch(getAssets(address));
  }

  componentDidMount() {
    this.onChangeAsset = this.onChangeAsset.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { dispatch, address, assetsSelect, assets } = nextProps;

    const selectedAsset = idx(
      assetsSelect,
      (_: FormState) => _.values[this.assetName],
    );
    const nextBlockIndex = idx(nextProps.transaction, (_: any) => _.index);
    const blockIndex = idx(this.props.transaction, (_: any) => _.index);
    if (nextBlockIndex !== blockIndex) {
      confirm('送金しました');
      dispatch(getBalance(address, selectedAsset));
    }

    // 初期表示での balance の取得
    if (this.props.assets !== assets && assets.length) {
      dispatch(getBalance(address, assets[0].id));
    }
  }

  onChangeAsset(id: string) {
    const { dispatch, address } = this.props;
    dispatch(getBalance(address, id));
  }

  render() {
    const { balance, address, token, assets, assetsSelect } = this.props;
    const selectedAsset = idx(
      assetsSelect,
      (_: FormState) => _.values[this.assetName],
    ) || idx(assets, (_: Assets) => _[0].id);

    return (
      <div>
        <Address address={address} />
        <AssetsList assets={assets} />
        <AssetsSelect
          assets={assets}
          onChangeAsset={this.onChangeAsset}
          name={this.assetName}
        />
        <Balance balance={balance} />
        <Transfer address={address} token={token} assetId={selectedAsset} />
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
    form: { assetsSelect },
  } = state;
  return { address, balance, token, transaction, assets, assetsSelect };
};

export const WalletContainer = connect(mapStateToProps)(CreateWallet);
