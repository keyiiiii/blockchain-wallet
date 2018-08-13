import * as React from 'react';
import { Chance } from 'chance';
import { connect } from 'react-redux';
import { FormControl, Avatar } from '@material-ui/core';
import { FormState, FormStateMap } from 'redux-form/lib/reducer';
import { Dispatch } from 'redux';
import {
  Field as ReduxField,
  reduxForm,
  FormErrors,
  InjectedFormProps,
} from 'redux-form';
import { Select } from '../../ui/Form/Select';
import { Asset, Assets } from '../../../actions/assets';
import idx from 'idx';

interface SyncErrors {
  syncErrors?: FormErrors<FormData>;
}

interface Props {
  dispatch: Dispatch<any>;
  assetDetail: Asset;
  buyAssetSelect: FormState & SyncErrors;
  assets: Assets;
  onChangeAsset: (id: string) => void;
  name: string;
}

interface State {
  form: FormStateMap;
}

class CreateBuyAsset extends React.PureComponent<
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

  renderAvator(id: string) {
    const { assetDetail } = this.props;
    return (
      <Avatar
        style={{
          background: new Chance(id).color({ format: 'hex' }),
        }}
      >
        {assetDetail.name.slice(0, 1).toUpperCase()}
      </Avatar>
    );
  }

  render() {
    const { assets, name, assetDetail, buyAssetSelect } = this.props;
    const id = idx(buyAssetSelect, (_: FormState) => _.values[name]);
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <form onChange={this.selectAsset}>
          <FormControl>
            <ReduxField native component={Select} name={name}>
              <option disabled />
              {assets &&
                assets.map((asset: Asset, i: number) => (
                  <option value={asset.id} key={i}>
                    {asset.name}
                  </option>
                ))}
            </ReduxField>
            {assetDetail && <p>Max: {assetDetail.total}</p>}
          </FormControl>
        </form>
        {assets && id && this.renderAvator(id)}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const {
    form: { buyAssetSelect },
  } = state;
  return { buyAssetSelect };
};

const buyAsset = connect(mapStateToProps)(CreateBuyAsset);

export const BuyAsset = reduxForm({
  form: 'buyAssetSelect',
})(buyAsset);
