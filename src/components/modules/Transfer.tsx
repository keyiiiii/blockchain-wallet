import * as React from 'react';
import idx from 'idx';
import { Button } from '@material-ui/core';
import { Dispatch } from 'redux';
import {
  Field as ReduxField,
  reduxForm,
  FormErrors,
  InjectedFormProps,
} from 'redux-form';
import { connect } from 'react-redux';
import { Field } from '../ui/Form/Field';
import { FormState, FormStateMap } from 'redux-form/lib/reducer';
import { postTransaction } from '../../actions/transaction';

interface SyncErrors {
  syncErrors?: FormErrors<FormData>;
}

interface Props {
  dispatch: Dispatch<any>;
  transfer: FormState & SyncErrors;
  token: string;
  address: string;
  assetId: string;
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
    const {
      token: seed,
      address: from,
      transfer,
      dispatch,
      assetId,
    } = this.props;

    const to = idx(transfer, (_: FormState) => _.values[this.toName]);
    const value = idx(transfer, (_: FormState) => _.values[this.valueName]);

    dispatch(postTransaction({ seed, from, to, value, assetId }));
  }

  render() {
    return (
      <div style={{ padding: 40 }}>
        <h3>Token Transfer</h3>
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
