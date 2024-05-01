# meteor-saml-demo

Demo for the [qnipp:meteor-accounts-saml](https://atmospherejs.com/qnipp/meteor-accounts-saml) package

See the [live demo on meteorapp.com](https://meteor-saml-demo.meteorapp.com/).

## Server configuration

* Set up the SAML providers as in [server/saml.js](./server/saml.js) or provide them in `Meteor.settings.saml`
* (Optional) Create hooks for validations and the account creation as in [server/accounts-hooks.js](./server/account-hooks.js)

## Client configuration

The demo client is based on React.

* The login is performed via a redirection. The respective links for all configured SAML providers are available through the `saml.getLoginLinks` method. See the example in [import/ui/LoginLinks.jsx](./import/ui/LoginLinks.jsx).
* A successful login can easily detected using the reactive `Meteor.user()` method. See the example in [import/ui/User.jsx](./import/ui/User.jsx).
* An unsuccesful login can be detected by registering a callback to `Accounts.onLoginFailure()`. See the example in [import/ui/LoginState.jsx](./import/ui/LoginState.jsx).

## Further reading

See the [README](./packages/meteor-accounts-saml/README.md) file of the package.

