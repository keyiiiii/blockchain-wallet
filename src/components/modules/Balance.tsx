import * as React from 'react';

interface Props {
  balance: number;
}

export const Balance: React.SFC<Props> = ({ balance }) => (
  <div style={{ padding: 40 }}>
    <h3>Account Balance</h3>
    <div>{balance} token</div>
  </div>
);
