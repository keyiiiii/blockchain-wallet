import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Props as RouteProps } from '../services/router';
import { BlockchainState } from '../reducers/blockchain';
import { getChain } from '../actions/blockchain';

interface Props extends RouteProps {
  dispatch: Dispatch<any>;
  blockchain: any;
}

interface State {
  blockchain: BlockchainState;
}

class CreateBlockchain extends React.PureComponent<Props, {}> {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getChain());
  }

  render() {
    const { blockchain } = this.props;
    if (!blockchain || !blockchain.length) {
      return null;
    }
    return (
      <div style={{ padding: 40 }}>
        <pre>{JSON.stringify(blockchain.reverse(), null, '\t')}</pre>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  const {
    blockchain: { blockchain },
  } = state;
  return { blockchain };
};

export const BlockchainContainer = connect(mapStateToProps)(CreateBlockchain);
