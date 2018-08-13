import { handleActions } from 'redux-actions';
import { api as constant } from '../constant';

export interface SwapState {
  swapOrder?: any;
}

export const initialState: SwapState = {
  swapOrder: null,
};

export const swap = handleActions(
  {
    [constant.CREATE_SWAP_ORDER]: (state, action) => ({
      ...state,
      swapOrder: action.payload.swapOrder,
    }),
  },
  initialState,
);
