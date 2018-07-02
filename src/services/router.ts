import Router from 'universal-router';
import * as React from 'react';
import { DecoratedComponentClass } from 'redux-form/lib/reduxForm';

interface Result {
  element: any;
  redirect?: string;
  context?: Context;
}

export interface Context {
  next: () => Promise<Result>;
  pathname: string;
  params: { [key: string]: string };
  query: { [key: string]: string };
}

export interface Props {
  location: Context;
}

export interface Route {
  location: Context;
  Container: React.ComponentClass<Props> | DecoratedComponentClass<{}, {}>;
}

const routes = [
  {
    path: '',
    async action(context: Context): Promise<Route> {
      const {
        AccountContainer,
      } = await import('../containers/AccountContainer');
      return {
        location: context,
        Container: AccountContainer,
      };
    },
  },
  {
    path: '/wallet',
    async action(context: Context): Promise<Route> {
      const { WalletContainer } = await import('../containers/WalletContainer');
      return {
        location: context,
        Container: WalletContainer,
      };
    },
  },
  {
    path: '/blockchain',
    async action(context: Context): Promise<Route> {
      const {
        BlockchainContainer,
      } = await import('../containers/BlockchainContainer');
      return {
        location: context,
        Container: BlockchainContainer,
      };
    },
  },
  {
    path: '/tokens',
    async action(context: Context): Promise<Route> {
      const { TokensContainer } = await import('../containers/TokensContainer');
      return {
        location: context,
        Container: TokensContainer,
      };
    },
  },
  {
    path: '(.*)',
    async action(context: Context): Promise<Route> {
      const {
        NotFoundContainer,
      } = await import('../containers/NotFoundContainer');
      return {
        location: context,
        Container: NotFoundContainer,
      };
    },
  },
];

export const router = new Router(routes);
