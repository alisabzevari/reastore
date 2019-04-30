import { StoreMap } from './types';

let container: StoreMap = {};

export function register(obj: StoreMap) {
  Object.assign(container, obj);
}

export function getAll() {
  return container;
}
