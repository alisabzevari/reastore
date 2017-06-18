let container = {};

const register = (obj) => {
  Object.assign(container, obj);
}

const getAll = () => container;

export { getAll, register };
