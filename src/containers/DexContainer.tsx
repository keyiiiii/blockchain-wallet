import * as React from 'react';
import idx from 'idx';
import {
  reduxForm,
  FormErrors,
  InjectedFormProps,
  Field as ReduxField,
} from 'redux-form';
import { FormState, FormStateMap } from 'redux-form/lib/reducer';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Props as RouteProps } from '../services/router';
import {
  Assets,
  getAssetsList,
  getAssets,
  Asset,
  getAsset,
} from '../actions/assets';
import { AssetsState } from '../reducers/assets';
import { history } from '../router/history';
import { UserState } from '../reducers/user';
import { getBalance } from '../actions/user';
import { SellAsset } from '../components/modules/dex/SellAsset';
import { BuyAsset } from '../components/modules/dex/BuyAsset';
import { SwapList } from '../components/modules/SwapList';
import { Field } from '../components/ui/Form/Field';
import { ArrowForward } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { Escrow, getSwaps, postSwapOrder, deleteSwap } from '../actions/swap';
import { SwapState } from '../reducers/swap';

interface SyncErrors {
  syncErrors?: FormErrors<FormData>;
}

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  transactionSwapOrder: any;
  assetsList: Assets;
  assets: Assets;
  balance: number;
  address: string;
  token: string;
  sellAssetSelect: FormState & SyncErrors;
  buyAssetSelect: FormState & SyncErrors;
  swapOrder: FormState & SyncErrors;
  swaps: Escrow[];
}

interface State {
  user: UserState;
  swap: SwapState;
  assets: AssetsState;
  form: FormStateMap;
}

class CreateDex extends React.PureComponent<
  Props & InjectedFormProps<{}, Props>,
  {}
> {
  private sellAssetName = 'sellAssetName';
  private buyAssetName = 'buyAssetName';

  private sellAssetValueName = 'sellAssetValueName';
  private buyAssetValueName = 'buyAssetValueName';

  componentWillMount() {
    const { address, dispatch } = this.props;
    // TODO: ルータ側で判定する
    // TODO: 存在する address かどうかを確認する(要 blockchain 変更)
    if (!address) {
      history.push('/');
    }

    dispatch(getAssetsList());
    dispatch(getAssets(address));
    dispatch(getSwaps(address));
  }

  componentDidMount() {
    this.onChangeSellAsset = this.onChangeSellAsset.bind(this);
    this.onChangeBuyAsset = this.onChangeBuyAsset.bind(this);
    this.postSwapOrder = this.postSwapOrder.bind(this);
    this.onDeleteList = this.onDeleteList.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { dispatch, address, assets, transactionSwapOrder } = nextProps;

    // 初期表示での balance の取得
    if (this.props.assets !== assets && assets.length) {
      dispatch(getBalance(address, assets[0].id));
    }

    const nextSwapOrderIndex = idx(transactionSwapOrder, (_: any) => _.index);
    const swapOrderIndex = idx(
      this.props.transactionSwapOrder,
      (_: any) => _.index,
    );
    if (nextSwapOrderIndex !== swapOrderIndex) {
      // 配列で返ってきたら SWAP 成功
      if (transactionSwapOrder.length) {
        confirm('SWAP成功しました');
      } else {
        confirm('オーダーブックを作りました');
      }
      dispatch(getSwaps(address));
    }
  }

  onChangeSellAsset(id: string) {
    const { dispatch, address } = this.props;
    dispatch(getBalance(address, id));
  }

  onChangeBuyAsset(id: string) {
    const { dispatch } = this.props;
    dispatch(getAsset(id));
  }

  postSwapOrder(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const {
      swapOrder,
      dispatch,
      address,
      token,
      sellAssetSelect,
      buyAssetSelect,
    } = this.props;
    const sellAssetValue = idx(
      swapOrder,
      (_: FormState) => _.values[this.sellAssetValueName],
    );
    const buyAssetValue = idx(
      swapOrder,
      (_: FormState) => _.values[this.buyAssetValueName],
    );

    const sellAssetId = idx(
      sellAssetSelect,
      (_: FormState) => _.values[this.sellAssetName],
    );
    const buyAssetId = idx(
      buyAssetSelect,
      (_: FormState) => _.values[this.buyAssetName],
    );

    const sell = {
      assetId: sellAssetId,
      value: sellAssetValue,
    };
    const buy = {
      assetId: buyAssetId,
      value: buyAssetValue,
    };

    dispatch(
      postSwapOrder({
        from: address,
        seed: token,
        sell,
        buy,
      }),
    );
  }

  onDeleteList(escrowId: string) {
    const { dispatch, address, token } = this.props;
    dispatch(
      deleteSwap(escrowId, {
        from: address,
        seed: token,
      }),
    );
  }

  render() {
    const { assets, assetsList, balance, buyAssetSelect, swaps } = this.props;
    const buySelectedAssetId = idx(
      buyAssetSelect,
      (_: FormState) => _.values[this.buyAssetName],
    );
    const assetDetail =
      assetsList &&
      assetsList.find((asset: Asset) => {
        return asset.id === buySelectedAssetId;
      });
    return (
      <div>
        <div style={{ padding: 40 }}>
          <h2>DEX</h2>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div
              style={{
                minWidth: '200px',
              }}
            >
              <SellAsset
                balance={balance}
                assets={assets}
                onChangeAsset={this.onChangeSellAsset}
                name={this.sellAssetName}
              />
              <ReduxField
                label="value"
                placeholder="0"
                component={Field}
                name={this.sellAssetValueName}
              />
            </div>
            <ArrowForward style={{ fontSize: '50px', margin: '40px' }} />
            <div
              style={{
                minWidth: '200px',
              }}
            >
              <BuyAsset
                assetDetail={assetDetail}
                assets={assetsList}
                onChangeAsset={this.onChangeBuyAsset}
                name={this.buyAssetName}
              />
              <ReduxField
                label="value"
                placeholder="0"
                component={Field}
                name={this.buyAssetValueName}
              />
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.postSwapOrder}
            type="submit"
          >
            SWAP
          </Button>
        </div>
        {swaps &&
          swaps.length > 0 &&
          assetsList && (
            <SwapList
              swaps={swaps}
              assets={assetsList}
              onDelete={this.onDeleteList}
            />
          )}
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
    swap: { swapOrder: transactionSwapOrder, swaps },
    assets: { assetsList, assets },
    form: { sellAssetSelect, buyAssetSelect, swapOrder },
  } = state;
  return {
    address,
    token,
    balance,
    assetsList,
    assets,
    sellAssetSelect,
    buyAssetSelect,
    swapOrder,
    transactionSwapOrder,
    swaps,
  };
};

const dexContainer = connect(mapStateToProps)(CreateDex);

export const DexContainer = reduxForm({
  form: 'swapOrder',
})(dexContainer);
