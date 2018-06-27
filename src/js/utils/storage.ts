import { storageKeys } from '../constant';

class Storage {
  storage: any;

  constructor(storage: any) {
    this.storage = storage;
  }

  private getStorage() {
    try {
      return JSON.parse(this.storage.getItem(storageKeys.WALLET));
    } catch (e) {
      return null;
    }
  }

  private setStorage(data: any) {
    try {
      this.storage.setItem(storageKeys.WALLET, JSON.stringify(data));
      return true;
    } catch (e) {
      return false;
    }
  }

  private clearStorage() {
    try {
      this.storage.removeItem(storageKeys.WALLET);
      return true;
    } catch (e) {
      return false;
    }
  }

  set(key: string, val: any) {
    const data = this.getStorage() || {};
    data[key] = val;
    return this.setStorage(data);
  }

  get(key: string) {
    const data = this.getStorage();
    if (!data) {
      return null;
    }
    return data[key];
  }

  exists(key: string) {
    const data = this.getStorage();
    if (!data) {
      return false;
    }
    return key in data;
  }

  remove(key: string) {
    const data = this.getStorage();
    if (data) {
      delete data[key];
      this.setStorage(data);
    }
  }

  clear() {
    this.clearStorage();
  }
}

export const localData = new Storage(localStorage);
export const sessionData = new Storage(sessionStorage);
