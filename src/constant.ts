import * as keyMirror from 'keymirror';

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
    GET_TOKEN: null,
  }),
);
