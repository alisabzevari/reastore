import { Store } from "./Store";
import { ComponentClass } from "react";

export type Listener = () => void;
export type Unsubscribe = () => void;

export type StoreMap = { [storeName: string]: Store };
export type MapStoresToProps<T> = (stores: StoreMap) => T;


export interface Connect {
    <TFromStoreProps, TOwnProps>(mapStoresToProps: MapStoresToProps<TFromStoreProps>): ComponentEnhancer<TFromStoreProps, TOwnProps>;
}

export interface ComponentEnhancer<TInjectedProps, TNeedsProps> {
    (component: ComponentClass<TNeedsProps>): ComponentClass<TNeedsProps & TInjectedProps>
}
