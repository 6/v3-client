import {
  Keys,
} from './types';

export default class KeysImpl implements Keys {
  readonly web3Proivder: {};

  constructor(
    web3Proivder: {},
  ) {
    this.web3Proivder = web3Proivder;
  }

  getApiKeys(): void {}
  registerApiKey(): void {}
  deleteApiKey(): void {}
}