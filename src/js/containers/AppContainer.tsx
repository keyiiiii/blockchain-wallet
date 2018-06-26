import React from 'react';
import { Transfer } from "../components/Transfer";
import { Balance } from "../components/Balance";

export class AppContainer extends React.PureComponent<{}, {}> {
  render() {
    return (
      <div>
        <Transfer />
        <Balance />
      </div>
    );
  }
}
