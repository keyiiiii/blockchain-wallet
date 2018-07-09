import * as React from 'react';
import { FormControl } from '@material-ui/core';
import { Dispatch } from 'redux';
import { FormState, FormStateMap } from 'redux-form/lib/reducer';
import {
  Field as ReduxField,
  reduxForm,
  FormErrors,
  InjectedFormProps,
} from 'redux-form';
import { connect } from 'react-redux';
import { Assets, Asset } from '../../actions/assets';
import { Select } from '../ui/Form/Select';

interface SyncErrors {
  syncErrors?: FormErrors<FormData>;
}

interface Props {
  dispatch: Dispatch<any>;
  assetsSelect: FormState & SyncErrors;
  assets: Assets;
  onChangeAsset: (id: string) => void;
  name: string;
}

interface State {
  form: FormStateMap;
}

class CreateAssetsSelect extends React.PureComponent<
  Props & InjectedFormProps<{}, Props>,
  {}
> {
  componentDidMount() {
    this.selectAsset = this.selectAsset.bind(this);
  }

  selectAsset(e: React.SyntheticEvent<{}>) {
    e.preventDefault();
    const { onChangeAsset } = this.props;
    const target = e.target as HTMLInputElement;
    onChangeAsset(target.value);
  }

  render() {
    const { assets, name } = this.props;
    return (
      <div style={{ padding: 40 }}>
        <h2>Token Select</h2>
        <form onChange={this.selectAsset}>
          <FormControl style={{ display: 'block', width: '100%' }}>
            <ReduxField native component={Select} name={name}>
              {assets &&
                assets.map((asset: Asset, i: number) => (
                  <option value={asset.id} key={i}>
                    {asset.name}
                  </option>
                ))}
            </ReduxField>
          </FormControl>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const {
    form: { assetsSelect },
  } = state;
  return { assetsSelect };
};

const assetsSelect = connect(mapStateToProps)(CreateAssetsSelect);

export const AssetsSelect = reduxForm({
  form: 'assetsSelect',
})(assetsSelect);
