import * as React from 'react';
import idx from 'idx';
import { Button, Grid } from '@material-ui/core';
import { apiUrl } from '../../../config';
import { Dispatch } from 'redux';
import {
  Field as ReduxField,
  reduxForm,
  FormErrors,
  InjectedFormProps,
} from 'redux-form';
import { connect } from 'react-redux';
import { Field } from '../Form/Field';
import { FormState, FormStateMap } from 'redux-form/lib/reducer';

interface SyncErrors {
  syncErrors?: FormErrors<FormData>;
}

interface Props {
  dispatch: Dispatch<any>;
  transfer: FormState & SyncErrors;
  token: string;
  address: string;
}

interface State {
  form: FormStateMap;
}

class CreateTransfer extends React.PureComponent<
  Props & InjectedFormProps<{}, Props>,
  {}
> {
  private toName = 'to';
  private valueName = 'value';

  componentDidMount() {
    this.postTransaction = this.postTransaction.bind(this);
  }

  postTransaction(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const { token: seed, address: from } = this.props;

    const { transfer } = this.props;
    const to = idx(transfer, (_: FormState) => _.values[this.toName]);
    const value = idx(transfer, (_: FormState) => _.values[this.valueName]);

    fetch(`${apiUrl}/transaction`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seed, from, to, value }),
    })
      .then((result: any) => result.json())
      .then((result: any) => {
        console.log('result', result);
        confirm('送金しました');
      })
      .catch((err: Error) => {
        console.error(err);
        alert('error: 残高が足りません');
      });
  }

  render() {
    return (
      <div style={{ padding: 80 }}>
        {/* tslint:disable-next-line:no-magic-numbers */}
        <Grid container spacing={40}>
          <h2>Token Transfer</h2>
          <form
            noValidate
            autoComplete="off"
            style={{ display: 'block', width: '100%' }}
            onSubmit={this.postTransaction}
          >
            <ReduxField
              label="To"
              placeholder="d4735e3a265e16eee03f59718b9b5d03019c07d8b6c51f90da3a666eec13ab35"
              name={this.toName}
              component={Field}
            />
            <ReduxField
              label="Value"
              placeholder="100"
              name={this.valueName}
              component={Field}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.postTransaction}
              type="submit"
            >
              PAYMENT
            </Button>
          </form>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const {
    form: { transfer },
  } = state;
  return { transfer };
};

const transfer = connect(mapStateToProps)(CreateTransfer);

export const Transfer = reduxForm({
  form: 'transfer',
})(transfer);
