import * as React from 'react';

interface Props {
  address: string;
}

export const Address: React.SFC<Props> = ({ address }) => (
  <div style={{ padding: 40 }}>
    <h2>Address</h2>
    <div>{address}</div>
  </div>
);
