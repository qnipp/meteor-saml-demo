import React from "react";
import { useTracker } from "meteor/react-meteor-data";

export const User = () => {
  const user = useTracker(() => Meteor.user());

  if (!user) {
    return <p>Not logged in.</p>;
  }

  return (
    <>
      <p>Logged in as {user.username}.</p>
      <pre>{JSON.stringify(user)}</pre>
      <button onClick={() => Meteor.logout()}>Log out</button>
    </>
  );
};
