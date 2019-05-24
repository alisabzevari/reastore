import * as React from "react";
import GithubRepos from "./GithubRepos";
import { Provider } from "../../index";
import { allStores } from "../stores";

export const App = () => (
  <div>
    <Provider value={allStores}>
      <GithubRepos />
    </Provider>
  </div>
);
App.displayName = "App";
