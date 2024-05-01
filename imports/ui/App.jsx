import React from "react";
import { User } from "./User.jsx";
import { LoginLinks } from "./LoginLinks.jsx";
import { LoginState } from "./LoginState.jsx";

export const App = () => (
  <div>
    <h1>Welcome to meteor-saml-demo!</h1>
    <User />
    <LoginState />
    <LoginLinks />
  </div>
);
