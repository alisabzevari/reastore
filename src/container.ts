import * as React from "react";

import { StoreMap } from "./types";

// export class Container {
//   constructor(private stores: StoreMap = {}) {}

//   register(obj: StoreMap) {
//     Object.assign(this.stores, obj);
//   }

//   getAll() {
//     return this.stores;
//   }
// }

export const ContainerContext = React.createContext({});
