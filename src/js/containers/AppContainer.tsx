import React from 'react';
import { Transfer } from "../components/Transfer";
import { Balance } from "../components/Balance";
import { Account } from "../components/Account";

export class AppContainer extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <Account />
        <Transfer />
        <Balance />
      </div>
    );
  }
}
