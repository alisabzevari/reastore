import * as React from "react";
import { ContainerContext } from "./container";
import { MapStoresToProps, StoreMap, Unsubscribe } from "./types";
import { Store } from "./Store";

export function connect<TInjectedProps, TAllProps extends TInjectedProps>(
  mapStoresToProps: MapStoresToProps<TInjectedProps>,
  Cmp: React.ComponentType<TAllProps | {}>
) {
  return class ConnectedComponent extends React.PureComponent<
    Omit<TAllProps, keyof TInjectedProps>
  > {
    subscribedStores: {
      [storeName: string]: Unsubscribe;
    } = {};

    render() {
      const allStores: StoreMap = this.withAutoSubscribers(this.context);
      return <Cmp {...mapStoresToProps(allStores)} {...this.props} />;
    }

    componentWillUnmount() {
      Object.values(this.subscribedStores).forEach(u => u());
    }

    subscribeToStore(name: string, store: Store) {
      const unsubscribe = store.subscribe(() => {
        this.forceUpdate();
      });
      this.subscribedStores[name] = unsubscribe;
    }

    withAutoSubscribers(stores: StoreMap): StoreMap {
      const watchedStores: StoreMap = {};
      Object.keys(stores).forEach(key => {
        Object.defineProperty(watchedStores, key, {
          get: () => {
            if (!this.subscribedStores[key]) {
              this.subscribeToStore(key, stores[key]);
              this.subscribedStores[key];
            }
            return stores[key];
          }
        });
      });
      return watchedStores;
    }

    static displayName: string = `Connect(${Cmp.name || Cmp.displayName})`;
    static contextType = ContainerContext;
  };
}
