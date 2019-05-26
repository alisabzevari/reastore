import * as React from "react";
import { AllStores } from "../stores";
import { connect } from "../../index";

const CurrentUser = ({
  username,
  time
}: {
  username: string;
  time: string;
}) => (
  <div>
    <div>Current User is: {username}</div>
    <div>Current time is: {time}</div>
  </div>
);

const mapStoresToProps = ({ githubReposStore, clockStore }: AllStores) => ({
  username: githubReposStore.state.username,
  time: clockStore.state.currentTime
});

export default connect(mapStoresToProps)(CurrentUser);
