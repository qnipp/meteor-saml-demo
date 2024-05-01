import { Meteor } from "meteor/meteor";
import { SAML } from "@node-saml/node-saml";

export default function getSAMLForIdP(idpName) {
  const settings = Meteor.settings.saml;
  const selectedIdp = idpName ? idpName : settings._default;
  if (!settings[selectedIdp]) {
    throw new Meteor.Error(
      "unknown-idp",
      "Settings for IDP not found",
      `Meteor.settings.saml.${selectedIdp} is not set.`
    );
  }
  const options = {
    ...settings[selectedIdp],
    callbackUrl: Meteor.absoluteUrl(
      `${Meteor.settings.saml._prefix}/validate/${selectedIdp}`
    ),
  };
  const saml = new SAML(options);
  return saml;
}
