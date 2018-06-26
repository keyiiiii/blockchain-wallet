import React from 'react';
import idx from 'idx';
import { Button, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { Field as ReduxField, reduxForm, FormErrors, InjectedFormProps } from 'redux-form';
import { Dispatch } from 'redux';
import { FormState, FormStateMap } from 'redux-form/lib/reducer';
import { Field } from '../components/ui/Form/Field';
import { apiUrl } from '../config';

interface SyncErrors {
  syncErrors?: FormErrors<FormData>;
}

interface Props {
  dispatch: Dispatch<any>;
  account: FormState & SyncErrors;
}

interface State {
  form: FormStateMap;
}

class CreateAccount extends React.PureComponent<
  Props & InjectedFormProps<{}, Props>,
  {}
> {
  private seedName = 'seed';

  postAccount(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const { account } = this.props;
    const seed = idx(
      account,
      (_: FormState) => _.values[this.seedName],
    );

    fetch(`${apiUrl}/account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ seed }),
    })
      .then((result: any) => result.json())
      .then((account: {
        address: string;
      }) => {
        alert(`Account Balance: ${account.address}`);
        console.log('result', account.address);
      })
      .catch((err: Error) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div>
        <div style={{ padding: 80 }}>
           <Grid container spacing={40}>
             <h2>Sign up</h2>
             <form
               noValidate
               autoComplete="off"
               style={{display: "block", width: "100%"}}
               onSubmit={this.postAccount.bind(this)}
             >
               <ReduxField
                 label="Seed"
                 placeholder="12345"
                 name={this.seedName}
                 component={Field}
               />
               <Button variant="contained" color="primary" onClick={this.postAccount.bind(this)} type="submit">
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
  const { form: { account } } = state;
  return { account };
};

const accountContainer = connect(mapStateToProps)(CreateAccount);

export const AccountContainer = reduxForm({
  form: 'account',
})(accountContainer);
