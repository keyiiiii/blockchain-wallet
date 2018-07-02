import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Grid } from '@material-ui/core';
import {
  Field as ReduxField,
  reduxForm,
  InjectedFormProps,
} from 'redux-form';
import { FormStateMap, FormState } from 'redux-form/lib/reducer';
import { Props as RouteProps } from '../services/router';
import { Field } from '../components/ui/Form/Field';
import { UserState } from '../reducers/user';
import idx from 'idx';
import { history } from "../router/history";

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  tokens: any; // TODO: import action types
  address: string;
  balance: number;
}

interface State {
  form: FormStateMap;
  user: UserState;
  isDisabled: boolean;
}

function getTokensInfo(tokens: any, self: any) {
  const assetName = idx(tokens, (_: FormState) => _.values[self.assetName]);
  const description = idx(tokens, (_: FormState) => _.values[self.assetDescriptionName]);
  const total = idx(tokens, (_: FormState) => _.values[self.assetTotalName]);
  const decimals = idx(tokens, (_: FormState) => _.values[self.assetDecimalsName]);
  return { assetName, description, total, decimals };
}

class CreateTokens extends React.PureComponent<
  Props & InjectedFormProps<{}, Props>,
  {}
>  {
  private assetName = 'assetName';
  private assetDescriptionName = 'description';
  private assetTotalName = 'total';
  private assetDecimalsName = 'decimals';

  state = {
    isEnabled: false,
  };

  componentWillMount() {
    const { address } = this.props;
    // TODO: ルータ側で判定する
    // TODO: 存在する address かどうかを確認する(要 blockchain 変更)
    if (!address) {
      history.push('/');
    }
  }

  componentDidMount() {
    this.generateTokens = this.generateTokens.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { tokens, balance } = nextProps;
    const form = getTokensInfo(tokens, this);
    if (form.assetName && form.description && form.total && form.decimals && balance) {
      this.setState({
        isEnabled: true,
      });
    }
  }

  generateTokens(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const { tokens } = this.props;

    const form = getTokensInfo(tokens, this);
    console.warn('form', form);
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
            onSubmit={this.generateTokens}
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
              placeholder="From 0 to 8"
              name={this.assetDecimalsName}
              component={Field}
              type="number"
              required
            />
            <p>Fee 1 Token</p>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!isEnabled}
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
    form: { tokens },
    user: {
      account: { address },
      balance,
    },
  } = state;
  return { tokens, address, balance };
};

const tokensContainer = connect(mapStateToProps)(CreateTokens);

export const TokensContainer = reduxForm({
  form: 'tokens',
})(tokensContainer);
