import { Store } from "../Store";

describe("Store", () => {
  it("setState should dispatch the change to all subscribers", done => {
    const store = new Store<{ x: string }>();

    store.subscribe(() => {
      expect(store.state).toEqual({ x: "changed" });
      done();
    });

    expect(store.state).toEqual({});
    store.setState({ x: "changed" });
  });

  it("setState should only change the provided fields in the state", () => {
    const store = new Store<{ x1: string; x2: string }>();

    store.setState({ x1: "1", x2: "2" });
    expect(store.state).toEqual({ x1: "1", x2: "2" });

    store.setState({ x1: "2" });
    expect(store.state).toEqual({ x1: "2", x2: "2" });
  });

  it("initial state is always {}", () => {
    const store = new Store<{ x1: string; x2: string }>();

    expect(store.state).toEqual({});
  });

  it("unsubscribe should remove the subscriber", () => {
    const store = new Store<{ x: string }>();
    const listener = jest.fn();
    store.subscribe(listener);
    const unsubscribe = store.subscribe(() => {
      throw new Error("This should not run!");
    });
    store.subscribe(listener);

    unsubscribe();

    store.setState({ x: "changed" });

    expect(listener).toHaveBeenCalledTimes(2);
  });
});
