import * as keyMirror from 'keymirror';

export const router = Object.freeze(
  keyMirror({
    CHANGE_ROUTE: null,
  }),
);

export const storageKeys = Object.freeze(
  keyMirror({
    TOKEN: null,
    WALLET: null,
    ADDRESS: null,
  }),
);

export const api = Object.freeze(
  keyMirror({
    CREATE_ACCOUNT: null,
    READ_TOKEN: null,
    READ_BALANCE: null,
  }),
);
