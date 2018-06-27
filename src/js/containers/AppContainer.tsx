import React from 'react';
import { TransferContainer } from "./TransferContainer";
import { Balance } from "../components/Balance";
import { AccountContainer } from "./AccountContainer";

export class AppContainer extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <AccountContainer />
        <TransferContainer />
        <Balance />
      </div>
    );
  }
}
