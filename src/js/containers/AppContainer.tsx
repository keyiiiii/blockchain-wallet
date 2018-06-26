import React from 'react';
import { Transfer } from "../components/Transfer";
import { Balance } from "../components/Balance";
import { AccountContainer } from "./AccountContainer";

export class AppContainer extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <AccountContainer />
        <Transfer />
        <Balance />
      </div>
    );
  }
}
