import { Listener, Unsubscribe } from "./types";

export class Store<T extends object = {}> {
  private subscribers: Listener[];
  public state: T;

  constructor() {
    this.subscribers = [];
    this.state = {} as T;
  }

  setState(state: Partial<T>) {
    this.state = Object.assign({}, this.state, state);
    this.dispatch();
  }

  subscribe(listener: Listener): Unsubscribe {
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
