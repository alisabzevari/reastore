import * as React from "react";
import { ContainerContext } from "./container";
import { MapStoresToProps, StoreMap, Unsubscribe } from "./types";
import { Store } from "./Store";

export function connect<TStoreRelatedProps, TOtherProps>(
  mapStoresToProps: MapStoresToProps<TStoreRelatedProps>
) {
  return (Cmp: React.ComponentClass<TStoreRelatedProps & TOtherProps>) =>
    class ConnectedComponent extends React.Component<
      TStoreRelatedProps & TOtherProps
    > {
      subscribedStores: { [storeName: string]: Unsubscribe } = {};

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

      static displayName: string = `Connect(${Cmp.name ||
        Cmp.displayName})`;
      static contextType = ContainerContext;
    } as React.ElementType<Partial<TStoreRelatedProps> & TOtherProps>;
}
