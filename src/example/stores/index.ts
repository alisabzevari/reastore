import { githubReposStore } from "./GithubReposStore";
import { clockStore } from "./ClockStore";

export const allStores = {
  githubReposStore,
  clockStore
};

export type AllStores = typeof allStores;
