Package.describe({
  name: "qnipp:meteor-accounts-saml",
  summary:
    "Integrates the Meteor application as SAML Service Provider, based on node-saml",
  version: "0.0.1",
  git: "https://github.com/qnipp/meteor-accounts-saml.git",
});

Package.onUse(function (api) {
  api.versionsFrom("2.3");
  api.use("ecmascript", ["client", "server"]);
  api.use("routepolicy", "server");
  api.use("webapp", "server");
  api.use("random", "server");
  api.use("accounts-base", ["client", "server"]);
  api.imply("accounts-base", ["client", "server"]);

  api.mainModule("saml_server.js", "server");
  api.mainModule("saml_client.js", "client");

  api.addAssets(["assets/response.html"], "server");
});

Package.onTest((api) => {
  api.use("ecmascript", ["client", "server"]);
  api.use("random", "server");
  api.use("qnipp:meteor-accounts-saml");
  api.use("meteortesting:mocha");

  api.mainModule("package-tests.js");
});

Npm.depends({
  "@node-saml/node-saml": "4.0.5",
  "body-parser": "1.20.2",
});
