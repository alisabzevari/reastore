import { StoreMap } from './connect';

let container = {};

const register = (obj: StoreMap) => {
  Object.assign(container, obj);
}

const getAll = () => container;

export { getAll, register };
