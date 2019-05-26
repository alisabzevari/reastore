import * as React from "react";
import GithubRepos from "./GithubRepos";
import { Provider } from "reastore";
import { allStores } from "../stores";
import CurrentUser from "./CurrentUser";

export const App = () => (
  <div>
    <Provider value={allStores}>
      <CurrentUser />
      <GithubRepos />
    </Provider>
  </div>
);
App.displayName = "App";
