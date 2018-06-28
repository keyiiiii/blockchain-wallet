import * as React from 'react';

interface Props {
  balance: string;
}

export const Balance: React.SFC<Props> = ({ balance }) => (
  <div style={{ padding: 40 }}>
    <h2>Account Balance</h2>
    <div>{balance} token</div>
  </div>
);
