import * as React from 'react';
import { history } from '../router/history';
import idx from 'idx';
import { Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { generateMnemonic, mnemonicToSeedHex } from 'bip39';
import {
  Field as ReduxField,
  reduxForm,
  FormErrors,
  InjectedFormProps,
} from 'redux-form';
import { Dispatch } from 'redux';
import { FormState, FormStateMap } from 'redux-form/lib/reducer';
import { Field } from '../components/ui/Form/Field';
import { postAccount } from '../actions/user';
import { UserState } from '../reducers/user';
import { Props as RouteProps } from '../services/router';

interface SyncErrors {
  syncErrors?: FormErrors<FormData>;
}

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  account: FormState & SyncErrors;
  address: FormState & SyncErrors;
}

interface State {
  form: FormStateMap;
  user: UserState;
  mnemonic: string;
}

class CreateAccount extends React.PureComponent<
  Props & InjectedFormProps<{}, Props>,
  {}
> {
  private mnemonicName = 'mnemonic';

  state = {
    mnemonic: '',
  };

  componentWillMount() {
    const { address } = this.props;
    // TODO: ルータ側で判定する
    // TODO: 存在する address かどうかを確認する(要 blockchain 変更)
    if (address) {
      history.push('/wallet');
    }
  }

  componentDidMount() {
    this.postAccount = this.postAccount.bind(this);
    this.generateMnemonic = this.generateMnemonic.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { address } = this.props;
    const { address: nextAddress } = nextProps;
    if (nextAddress !== address) {
      alert(`Account Address: ${nextAddress}`);
      history.push('/wallet');
    }
  }

  postAccount(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const { account, dispatch } = this.props;
    const mnemonic = idx(account, (_: FormState) => _.values[this.mnemonicName]);

    if (mnemonic) {
      const seed = mnemonicToSeedHex(mnemonic);
      dispatch(postAccount(seed));
    }

  }

  generateMnemonic() {
    this.setState({
      mnemonic: generateMnemonic(),
    });
  }

  renderMnemonic() {
    const { mnemonic } = this.state;
    if (!mnemonic) {
      return (
        <Button
          variant="contained"
          color="primary"
          onClick={this.generateMnemonic}
          type="button"
        >
          GENERATE MNEMONIC
        </Button>
      )
    }
    return (
      <div>
        <p style={{color: 'rgb(225, 0, 80)', fontWeight: 'bold'}}>Don't forget mnemonic!</p>
        <pre style={{background: '#eeeeee', padding: '20px'}}>{mnemonic}</pre>
      </div>
    );
  }

  render() {
    const { account } = this.props;
    const mnemonic = idx(account, (_: FormState) => _.values[this.mnemonicName]);
    return (
      <div style={{ padding: 80 }}>
        {/* tslint:disable-next-line:no-magic-numbers */}
        <Grid container spacing={40}>
          <h2>Sign up</h2>
          <form
            noValidate
            autoComplete="off"
            style={{ display: 'block', width: '100%' }}
            onSubmit={this.postAccount}
          >
            {this.renderMnemonic()}
            <ReduxField
              label="Mnemonic"
              placeholder="If you don't have any mnemonic, you should click 'GENERATE MNEMONIC.'"
              name={this.mnemonicName}
              component={Field}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!mnemonic}
            >
              CREATE ACCOUNT
            </Button>
          </form>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const {
    form: { account },
    user: {
      account: { address },
    },
  } = state;
  return { account, address };
};

const accountContainer = connect(mapStateToProps)(CreateAccount);

export const AccountContainer = reduxForm({
  form: 'account',
})(accountContainer);
