# qnipp:meteor-accounts-saml

Another SAML integration for Meteor, based on [node-saml](https://github.com/node-saml/node-saml)

## Open tasks

- Documentation
  - See the demo application on [GitHub](https://github.com/qnipp/meteor-saml-demo) as starting point
- Initiate login with `loginWithSaml`
  - Does not seem to be necessary by using the links provided by the `saml.getLoginLinks` method.
- Redirection to the page, where the login was initiated
  - Might be done by using the `RelayState` parameter for SAML

## Related works

- https://github.com/steffow/meteor-accounts-saml
- https://forums.meteor.com/t/saml-in-meteor-in-2022