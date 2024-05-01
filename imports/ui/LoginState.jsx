import React, { useState, useEffect } from "react";

export const LoginState = () => {
  const [loginState, setLoginState] = useState({ state: "pending" });

  useEffect(() => {
    return Accounts.onLoginFailure((error) => {
      setLoginState({ state: "failure", error });
    }).stop;
  }, []);

  useEffect(() => {
    return Accounts.onLogin((details) => {
      setLoginState({ state: "success", details });
    }).stop;
  }, []);

  useEffect(() => {
    return Accounts.onLogout(() => {
      setLoginState({ state: "loggedout" });
    }).stop;
  }, []);

  if (loginState?.state === "failure") {
    return (
      <>
        <h2>Login failed</h2>
        <pre>{JSON.stringify(loginState.error)}</pre>
      </>
    );
  }

  if (loginState?.state === "success") {
    return (
      <>
        <h2>Login successful</h2>
        <pre>{JSON.stringify(loginState.details)}</pre>
      </>
    );
  }

  if (loginState?.state === "loggedout") {
    return (
      <>
        <h2>Logged out</h2>
      </>
    );
  }

  return <h2>Login pending</h2>;
};
