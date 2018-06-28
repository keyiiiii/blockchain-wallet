import { handleActions } from 'redux-actions';
import { api as constant } from '../constant';

export interface BlockchainState {
  blockchain?: any;
}

export const initialState: BlockchainState = {
  blockchain: null,
};

export const blockchain = handleActions(
  {
    [constant.READ_CHAIN]: (state, action) => ({
      ...state,
      blockchain: action.payload.blockchain,
    }),
  },
  initialState,
);
