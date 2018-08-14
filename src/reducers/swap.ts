import { handleActions } from 'redux-actions';
import { api as constant } from '../constant';
import { Escrow } from '../actions/swap';

export interface SwapState {
  swapOrder?: any;
  swaps?: Escrow[];
}

export const initialState: SwapState = {
  swapOrder: null,
  swaps: null,
};

export const swap = handleActions(
  {
    [constant.CREATE_SWAP_ORDER]: (state, action) => ({
      ...state,
      swapOrder: action.payload.swapOrder,
    }),
    [constant.READ_SWAPS]: (state, action) => ({
      ...state,
      swaps: action.payload.swaps,
    }),
  },
  initialState,
);
