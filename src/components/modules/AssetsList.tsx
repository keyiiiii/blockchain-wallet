import * as React from 'react';
import { Assets, Asset } from '../../actions/assets';
import { List, ListItem, Avatar, ListItemText } from '@material-ui/core';
import { Chance } from 'chance';

interface Props {
  assets?: Assets;
}

export const AssetsList: React.SFC<Props> = ({ assets }) => {
  if (!(assets && assets.length)) {
    return null;
  }
  return (
    <div style={{ padding: 40 }}>
      <h2>Assets</h2>
      <List>
        {assets.map((asset: Asset, i: number) => {
          const chance = new Chance(asset.id);
          return (
            <ListItem key={i}>
              <Avatar
                style={{
                  background: chance.color({ format: 'hex' }),
                }}
              >
                {asset.name.slice(0, 1).toUpperCase()}
              </Avatar>
              <ListItemText
                primary={asset.name.toUpperCase()}
                secondary={asset.id}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
