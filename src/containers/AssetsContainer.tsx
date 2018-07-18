import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Grid, FormControlLabel } from '@material-ui/core';
import { Field as ReduxField, reduxForm, InjectedFormProps } from 'redux-form';
import { FormStateMap, FormState } from 'redux-form/lib/reducer';
import { Props as RouteProps } from '../services/router';
import { Field } from '../components/ui/Form/Field';
import { Checkbox } from '../components/ui/Form/Checkbox';
import { UserState } from '../reducers/user';
import idx from 'idx';
import { history } from '../router/history';
import { postAssets, Assets, AssetsForm } from '../actions/assets';
import { getBalance } from '../actions/user';
import { AssetsState } from '../reducers/assets';

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  assets: Assets;
  address: string;
  balance: number;
  token: string;
  transaction: any;
}

interface State {
  form: FormStateMap;
  user: UserState;
  isDisabled: boolean;
  assets: AssetsState;
}

class CreateAssets extends React.PureComponent<
  Props & InjectedFormProps<{}, Props>,
  {}
> {
  private assetName = 'assetName';
  private assetDescriptionName = 'description';
  private assetTotalName = 'total';
  private assetDecimalsName = 'decimals';
  private assetTransferableName = 'transferable';

  state = {
    isEnabled: false,
  };

  componentWillMount() {
    const { address, dispatch } = this.props;
    // TODO: ルータ側で判定する
    // TODO: 存在する address かどうかを確認する(要 blockchain 変更)
    if (!address) {
      history.push('/');
    }
    dispatch(getBalance(address));
  }

  componentDidMount() {
    this.postAssets = this.postAssets.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { assets } = nextProps;
    const form = this.getAssetsInfo(assets);
    // TODO: Fee 1 Token
    if (
      form.name &&
      form.description &&
      form.total
      // !isNaN(form.decimals) TODO
    ) {
      this.setState({
        isEnabled: true,
      });
    }

    const nextBlockIndex = idx(nextProps.transaction, (_: any) => _.index);
    const blockIndex = idx(this.props.transaction, (_: any) => _.index);
    if (nextBlockIndex !== blockIndex) {
      confirm('tokenを発行しました');
    }
  }

  getAssetsInfo(assets: Assets): AssetsForm {
    const name = idx(assets, (_: FormState) => _.values[this.assetName]);
    const description = idx(
      assets,
      (_: FormState) => _.values[this.assetDescriptionName],
    );
    const total = Number(
      idx(assets, (_: FormState) => _.values[this.assetTotalName]),
    );
    // TODO:
    // const decimals = Number(
    //   idx(assets, (_: FormState) => _.values[this.assetDecimalsName]),
    // );
    const decimals = 0;
    const transferable = idx(
      assets,
      (_: FormState) => _.values[this.assetTransferableName],
    );

    return { name, description, total, decimals, optional: { transferable } };
  }

  postAssets(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const { assets, dispatch, address, token } = this.props;

    const form = this.getAssetsInfo(assets);
    dispatch(postAssets({ from: address, seed: token, ...form }));
  }

  render() {
    const { isEnabled } = this.state;
    return (
      <div style={{ padding: 80 }}>
        {/* tslint:disable-next-line:no-magic-numbers */}
        <Grid container spacing={40}>
          <h2>Token Generation</h2>
          <form
            noValidate
            autoComplete="off"
            style={{ display: 'block', width: '100%' }}
            onSubmit={this.postAssets}
          >
            <ReduxField
              label="Name of your asset"
              name={this.assetName}
              component={Field}
              required
            />
            <ReduxField
              label="Description"
              placeholder="You can not change the description later"
              name={this.assetDescriptionName}
              component={Field}
              required
            />
            <ReduxField
              label="Total tokens"
              placeholder="100000000"
              name={this.assetTotalName}
              component={Field}
              type="number"
              required
            />
            <ReduxField
              label="Decimals"
              // placeholder="From 0 to 8"
              placeholder="0"
              name={this.assetDecimalsName}
              component={Field}
              type="number"
              disabled
            />
            <FormControlLabel
              control={
                <ReduxField
                  name={this.assetTransferableName}
                  component={Checkbox}
                  type="checkbox"
                />
              }
              label="Transferable"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isEnabled}
              style={{ display: 'block' }}
            >
              GENERATE
            </Button>
          </form>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const {
    form: { assets },
    user: {
      account: { address },
      balance,
      token,
    },
    assets: { transaction },
  } = state;
  return { assets, address, balance, token, transaction };
};

const assetsContainer = connect(mapStateToProps)(CreateAssets);

export const AssetsContainer = reduxForm({
  form: 'assets',
  initialValues: { transferable: true },
})(assetsContainer);
