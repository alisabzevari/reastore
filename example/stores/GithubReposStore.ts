import { Store } from "reastore";

export interface GithubReposState {
  username: string;
  repos: Object[];
  isLoading: boolean;
}

export class GithubReposStore extends Store<GithubReposState> {
  constructor() {
    super();

    this.state = {
      username: "alisabzevari",
      repos: [],
      isLoading: false
    };

    this.fetchRepos = this.fetchRepos.bind(this);
  }

  fetchRepos(username: string) {
    this.setState({ isLoading: true, username });
    fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(result => {
        this.setState({ repos: result, isLoading: false });
      });
  }
}

export const githubReposStore = ((window as any).githubReposStore = new GithubReposStore());
