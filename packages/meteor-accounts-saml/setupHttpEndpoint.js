import bodyParser from "body-parser";
import { Meteor } from "meteor/meteor";
import { RoutePolicy } from "meteor/routepolicy";
import { WebApp } from "meteor/webapp";
import middleware from "./middleware.js";

Meteor.startup(() => {
  Meteor.settings.saml = { _prefix: "/_saml", ...Meteor.settings.saml };

  WebApp.connectHandlers.use(
    Meteor.settings.saml._prefix,
    bodyParser.urlencoded({ extended: false })
  );

  WebApp.connectHandlers.use(Meteor.settings.saml._prefix, middleware);

  RoutePolicy.declare(Meteor.settings.saml._prefix, "network");
});
