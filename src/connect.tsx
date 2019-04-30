import * as React from 'react';
import { getAll } from './container';
import { MapStoresToProps, StoreMap, Unsubscribe, ComponentEnhancer } from "./types";

export function connect<TFromStoreProps, TOtherProps>(mapStoresToProps: MapStoresToProps<TFromStoreProps>): ComponentEnhancer<TFromStoreProps, TOtherProps> {
  return (Cmp: React.ComponentClass<TOtherProps>) => (
    class ConnectedComponent extends React.Component<TFromStoreProps & TOtherProps> {
      private effectiveStoreNames: string[];
      private allStores: StoreMap;
      private unsubscribes: Unsubscribe[];

      constructor(props: TFromStoreProps & TOtherProps) {
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
  );
};
