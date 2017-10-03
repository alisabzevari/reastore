export default class Store {
  constructor() {
    this.subscribers = [];
    this.state = {};
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state);
    this.dispatch();
  }

  subscribe(listener) {
    this.subscribers.push(listener);

    let isSubscribed = true;

    return () => {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      const index = this.subscribers.indexOf(listener);

      this.subscribers.splice(index, 1);
    };
  }

  dispatch() {
    this.subscribers.forEach(listener => listener());
  }
}
