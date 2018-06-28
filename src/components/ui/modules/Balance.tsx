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
import { Field } from '../Form/Field';
import { apiUrl } from '../../../config';

interface SyncErrors {
  syncErrors?: FormErrors<FormData>;
}

interface Props {
  dispatch: Dispatch<any>;
  balance: FormState & SyncErrors;
}

interface State {
  form: FormStateMap;
}

export class CreateBalance extends React.PureComponent<
  Props & InjectedFormProps<{}, Props>,
  {}
> {
  private addressName = 'address';

  componentDidMount() {
    this.postTransaction = this.postTransaction.bind(this);
  }

  postTransaction(e: React.SyntheticEvent<{}>) {
    e.preventDefault();

    const { balance } = this.props;
    const address = idx(balance, (_: FormState) => _.values[this.addressName]);

    fetch(`${apiUrl}/account/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((result: any) => result.json())
      .then((account: { balance: number }) => {
        alert(`Account Balance: ${account.balance}.`);
        console.log('result', account.balance);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <div style={{ padding: 80 }}>
          {/* tslint:disable-next-line:no-magic-numbers */}
          <Grid container spacing={40}>
            <h2>Account Balance</h2>
            <form
              noValidate
              autoComplete="off"
              style={{ display: 'block', width: '100%' }}
              onSubmit={this.postTransaction}
            >
              <ReduxField
                label="Address"
                placeholder="6b86b273ff34fce19d6b804eff5a3f5747ada4eaa22f1d49c01e52ddb7875b4b"
                name={this.addressName}
                component={Field}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.postTransaction}
                type="submit"
              >
                SHOW BALANCE
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
    form: { balance },
  } = state;
  return { balance };
};

const balance = connect(mapStateToProps)(CreateBalance);

export const Balance = reduxForm({
  form: 'balance',
})(balance);
