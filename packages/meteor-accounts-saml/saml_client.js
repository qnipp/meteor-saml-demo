export function performPendingLogin() {
  const samlProfileId = localStorage.getItem("_saml.temporaryProfileId");

  if (samlProfileId) {
    localStorage.removeItem("_saml.temporaryProfileId");
    console.log("callLoginMethod");
    Accounts.callLoginMethod({ methodArguments: [{ samlProfileId }] });
  }
}

Meteor.startup(() => {
  if (!Meteor.settings.public.saml?.performPendingLoginManually) {
    console.log("Calling pending Saml Logins on startup");
    performPendingSamlLogin();
  }
});
