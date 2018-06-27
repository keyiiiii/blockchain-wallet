import React from 'react';
import { TransferContainer } from "./TransferContainer";
import { BalanceContainer } from "./BalanceContainer";
import { AccountContainer } from "./AccountContainer";

export class AppContainer extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <AccountContainer />
        <TransferContainer />
        <BalanceContainer />
      </div>
    );
  }
}
