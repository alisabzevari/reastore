# ReaStore
This is a proof of concept for an extremely simple and powerful state management library for React. It is inspired by state management mechanism of React components.

## How it works
The library primarily consists of three different constructs:
1. **`Store`**: `Store` is a base class that supposed to handle the state management code. The api is almost like React components' state management (a `setState` method and a `state` property that holds the state). You can subclass stores from `Store`, define methods that change the state and assume that your components will react based on changes on state.
2. **`connect`**: It is like `connect` function of Redux. It will create smart components out of dump ones. Simply write a `mapStoresToProps` function accepting stores and returning props of the component:
``` js
class GithubRepos extends React.Component {
  ...
}

const mapStoresToProps = ({ githubReposStore, sessionStore }) => (
  {
    username: githubReposStore.state.username,
    isLoading: githubReposStore.state.isLoading,
    repos: githubReposStore.state.repos,
    fetchRepos: githubReposStore.fetchRepos,
    changeCurrentUser: sessionStore.changeCurrentUser
  }
);

export default connect(mapStoresToProps)(GithubRepos);
```
3. **`container`**: Which is a very simple and primitive dependency container. It has only one function called `register` and should be used like this example:
``` js
import { register } from 'store';

register({ myStore, githubReposStore, sessionStore });
```
