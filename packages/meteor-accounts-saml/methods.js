import { Meteor } from "meteor/meteor";

Meteor.methods({
  "saml.getLoginLinks"() {
    const { _default, _prefix, ...idps } = Meteor.settings.saml;
    console.log(Object.keys(idps));
    return Object.keys(idps).map((idp) => ({
      idp,
      link: `${_prefix}/login/${idp}`,
    }));
  },
});
