import * as React from "react";
import { ContainerContext } from "./container";
import { MapStoresToProps, StoreMap, Unsubscribe } from "./types";

export function connect<TStoreRelatedProps, TOtherProps>(
  mapStoresToProps: MapStoresToProps<TStoreRelatedProps>
) {
  return (Cmp: React.ComponentClass<TStoreRelatedProps & TOtherProps>) =>
    class ConnectedComponent extends React.Component<TStoreRelatedProps & TOtherProps> {
      unsubscribes: Unsubscribe[] = [];

      render() {
        const allStores: StoreMap = this.context;
        return <Cmp {...mapStoresToProps(allStores)} {...this.props} />;
      }

      componentDidMount() {
        const allStores: StoreMap = this.context;

        Object.keys(allStores).forEach(key => {
          const unsubscribe = allStores[key].subscribe(() => {
            this.forceUpdate();
          });
          this.unsubscribes.push(unsubscribe);
        });
      }

      componentWillUnmount() {
        this.unsubscribes.forEach(u => u());
      }

      static displayName: string = `Connect(${ConnectedComponent.name ||
        ConnectedComponent.displayName})`;
      static contextType = ContainerContext;
    } as React.ElementType<Partial<TStoreRelatedProps> & TOtherProps>;
}
