import { Store } from "./Store";

export type Listener = () => void;
export type Unsubscribe = () => void;

export type StoreMap = { [storeName: string]: Store };
export type MapStoresToProps<T> = (stores: StoreMap) => T;
