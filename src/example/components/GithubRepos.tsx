import * as React from "react";
import { connect } from "../../index";
import { AllStores } from "../stores";

export type Props = {
  username: string;
  fetchRepos: (username: string) => void;
  repos: { name: string }[];
  isLoading: boolean;
};
export type State = { username: string };

class GithubRepos extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: props.username || ""
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleOkClick = this.handleOkClick.bind(this);
  }

  handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ username: event.target.value });
  }

  handleOkClick() {
    this.props.fetchRepos(this.state.username);
  }

  render() {
    const { repos, isLoading } = this.props;

    return (
      <div>
        <input
          type="text"
          value={this.state.username}
          onChange={this.handleUsernameChange}
        />
        <button onClick={this.handleOkClick}>OK</button>
        <br />
        {isLoading ? "Loading..." : null}
        <ul>
          {repos.map(repo => (
            <li key={repo.name}>{repo.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStoresToProps = ({ githubReposStore }: AllStores) => ({
  username: githubReposStore.state.username,
  isLoading: githubReposStore.state.isLoading,
  repos: githubReposStore.state.repos,
  fetchRepos: githubReposStore.fetchRepos
});

const Cmmp = connect(mapStoresToProps)(GithubRepos);

export default Cmmp;
