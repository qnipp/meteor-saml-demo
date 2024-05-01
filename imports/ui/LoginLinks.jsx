import React, { useEffect, useState } from "react";
import { Meteor } from "meteor/meteor";

export const LoginLinks = () => {
  const [loginLinks, setLoginLinks] = useState([]);
  useEffect(() => {
    Meteor.call("saml.getLoginLinks", (error, result) => {
      setLoginLinks(result);
    });
  }, []);

  if (!loginLinks) {
    return <p>No SAML providers defined.</p>;
  }

  return (
    <>
      <h2>Choose one of the configured login providers</h2>
      <ul>
        {loginLinks.map(({ idp, link }) => (
          <li key={idp}>
            <a href={link}>Login to {idp}</a>
          </li>
        ))}
      </ul>
    </>
  );
};
