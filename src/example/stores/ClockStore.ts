import { Store } from "../../index";

export type ClockStoreState = {
  currentTime: string;
};

export class ClockStore extends Store<ClockStoreState> {
  constructor() {
    super();

    this.state = {
      currentTime: this.renderTime()
    };

    setInterval(() => {
      this.setState({ currentTime: this.renderTime() });
    }, 1000);
  }

  renderTime() {
    const today = new Date();
    return (
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
    );
  }
}

export const clockStore = ((window as any).clockStore = new ClockStore());
