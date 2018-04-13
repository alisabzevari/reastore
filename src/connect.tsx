import * as React from 'react';
import { getAll } from './container';
import Store, { Unsubscribe } from './Store';
export type StoreMap = { [storeName: string]: Store };
export type MapStoresToProps<T> = (stores: StoreMap) => T;

function connect<T>(mapStoresToProps: MapStoresToProps<T>) {
  return (Cmp: React.ComponentClass) => (
    class ConnectedComponent<T> extends React.Component<T> {
      effectiveStoreNames: string[];
      allStores: StoreMap;
      unsubscribes: Unsubscribe[];

      constructor(props: T) {
        super(props);

        const rawStores = getAll();

        this.effectiveStoreNames = [];
        this.allStores = this.watchStores(rawStores);
        this.unsubscribes = [];

        Object.keys(rawStores).forEach(key => {
          const unsubscribe = this.allStores[key].subscribe(() => {
            if (this.needsUpdate(key)) {
              this.forceUpdate();
            }
          });
          this.unsubscribes.push(unsubscribe);
        });
      }

      needsUpdate(storeName: string) {
        return this.effectiveStoreNames.some(name => name === storeName);
      }

      watchStores(stores: StoreMap) {
        const watchedStores: StoreMap = {};

        Object.keys(stores).forEach(key => {
          Object.defineProperty(watchedStores, key, {
            get: () => {
              this.effectiveStoreNames.push(key);
              return stores[key];
            }
          });
        });

        return watchedStores;
      }

      render() {
        return (
          <Cmp {...mapStoresToProps(this.allStores)} {...this.props} />
        );
      }

      componentWillUpdate() {
        this.effectiveStoreNames = [];
      }

      componentWillUnmount() { }

      static displayName: string = `Connect(${ConnectedComponent.name || ConnectedComponent.displayName})`;
    }
  )
};

export default connect;
