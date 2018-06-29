import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Button, Grid } from '@material-ui/core';
import {
  Field as ReduxField,
  reduxForm,
  InjectedFormProps,
} from 'redux-form';
import { FormStateMap } from 'redux-form/lib/reducer';
import { Props as RouteProps } from '../services/router';
import { Field } from "../components/ui/Form/Field";
import { UserState } from "../reducers/user";

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  blockchain: any;
}

interface State {
  form: FormStateMap;
  user: UserState;
}

class CreateTokens extends React.PureComponent<
  Props & InjectedFormProps<{}, Props>,
  {}
>  {
  private assetName = 'assetName';
  private assetDescriptionName = 'description';
  private assetTotalName = 'total';
  private assetDecimalsName = 'decimals';

  componentDidMount() {
    this.postAccount = this.postAccount.bind(this);
  }

  postAccount(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
  }

  render() {
    return (
      <div style={{ padding: 80 }}>
        <Grid container spacing={40}>
          <h2>Token Generation</h2>
          <form
            noValidate
            autoComplete="off"
            style={{ display: "block", width: "100%" }}
            onSubmit={this.postAccount}
          >
            <ReduxField
              label="Name of your asset"
              name={this.assetName}
              component={Field}
            />
            <ReduxField
              label="Description"
              placeholder="You can not change the description later"
              name={this.assetDescriptionName}
              component={Field}
            />
            <ReduxField
              label="Total tokens"
              placeholder="100000000"
              name={this.assetTotalName}
              component={Field}
            />
            <ReduxField
              label="Decimals"
              placeholder="From 0 to 8"
              name={this.assetDecimalsName}
              component={Field}
            />
            <p>Fee 1 Token</p>
            <Button
              variant="contained"
              color="primary"
              onClick={this.postAccount}
              type="submit"
              disabled
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
  return { state };
};

const tokensContainer = connect(mapStateToProps)(CreateTokens);

export const TokensContainer = reduxForm({
  form: 'tokens',
})(tokensContainer);
