import * as React from 'react';
import idx from 'idx';
import { Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
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
}

class CreateAccount extends React.PureComponent<
  Props & InjectedFormProps<{}, Props>,
  {}
> {
  private seedName = 'seed';

  componentDidMount() {
    this.postAccount = this.postAccount.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { address } = this.props;
    const { address: nextAddress } = nextProps;
    if (nextAddress !== address) {
      alert(`Account Address: ${nextAddress}`);
    }
  }

  postAccount(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const { account, dispatch } = this.props;
    const seed = idx(account, (_: FormState) => _.values[this.seedName]);

    dispatch(postAccount(seed));
  }

  render() {
    return (
      <div>
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
              <ReduxField
                label="Seed"
                placeholder="12345"
                name={this.seedName}
                component={Field}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.postAccount}
                type="submit"
              >
                CREATE ADDRESS
              </Button>
            </form>
          </Grid>
        </div>
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
