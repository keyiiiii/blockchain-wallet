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

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  tokens: any; // TODO: import action types
}

interface State {
  form: FormStateMap;
  user: UserState;
  isDisabled: boolean;
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

  componentDidMount() {
    this.generateTokens = this.generateTokens.bind(this);
  }

  generateTokens(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const { tokens } = this.props;
    const assetName = idx(tokens, (_: FormState) => _.values[this.assetName]);
    const description = idx(tokens, (_: FormState) => _.values[this.assetDescriptionName]);
    const total = idx(tokens, (_: FormState) => _.values[this.assetTotalName]);
    const decimals = idx(tokens, (_: FormState) => _.values[this.assetDecimalsName]);

    console.warn({ assetName, description, total, decimals });
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
              type="number"
            />
            <ReduxField
              label="Decimals"
              placeholder="From 0 to 8"
              name={this.assetDecimalsName}
              component={Field}
              type="number"
            />
            <p>Fee 1 Token</p>
            <Button
              variant="contained"
              color="primary"
              onClick={this.generateTokens}
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
  } = state;
  return { tokens };
};

const tokensContainer = connect(mapStateToProps)(CreateTokens);

export const TokensContainer = reduxForm({
  form: 'tokens',
})(tokensContainer);
