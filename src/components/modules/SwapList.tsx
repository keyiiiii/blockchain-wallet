import * as React from 'react';
import { List, ListItem, Avatar, ListItemText } from '@material-ui/core';
import { Chance } from 'chance';
import { Escrow } from '../../actions/swap';
import { Assets, Asset } from '../../actions/assets';

interface Props {
  swaps: Escrow[];
  assets: Assets;
}

export const SwapList: React.SFC<Props> = ({ swaps, assets }) => {
  return (
    <div style={{ padding: 40 }}>
      <h2>Swap list</h2>
      <div
        style={{
          display: 'flex',
          fontWeight: 'bold',
          justifyContent: 'space-around',
        }}
      >
        <span>SELL</span>
        <span>BUY</span>
      </div>
      <List>
        {swaps.map((swap: Escrow, i: number) => {
          const sellChance = new Chance(swap.sell.assetId);
          const buyChance = new Chance(swap.buy.assetId);
          const sellAssetName = assets.find(
            (asset: Asset) => asset.id === swap.sell.assetId,
          ).name;
          const buyAssetName = assets.find(
            (asset: Asset) => asset.id === swap.buy.assetId,
          ).name;
          return (
            <ListItem key={i} style={{ wordWrap: 'break-word' }}>
              <Avatar
                style={{
                  background: sellChance.color({ format: 'hex' }),
                }}
              >
                {sellAssetName.slice(0, 1).toUpperCase()}
              </Avatar>
              <ListItemText
                primary={sellAssetName.toUpperCase()}
                secondary={swap.sell.assetId}
              />
              <p
                style={{
                  paddingRight: '40px',
                  fontWeight: 'bold',
                }}
              >
                {swap.sell.value} token
              </p>
              <Avatar
                style={{
                  background: buyChance.color({ format: 'hex' }),
                }}
              >
                {buyAssetName.slice(0, 1).toUpperCase()}
              </Avatar>
              <ListItemText
                primary={buyAssetName.toUpperCase()}
                secondary={swap.buy.assetId}
              />
              <p
                style={{
                  paddingRight: '40px',
                  fontWeight: 'bold',
                }}
              >
                {swap.buy.value} token
              </p>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
