export default class Store {
  constructor() {
    this.subscribers = [];
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state);
    this.dispatch();
  }

  subscribe(linstener) {
    this.subscribers.push(linstener);

    let isSubscribed = true;

    return () => {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      const index = this.subscribers.indexOf(linstener);
      this.subscribers.splice(index, 1);
    }
  }

  dispatch() {
    this.subscribers.forEach(listener => listener());
  }
}
