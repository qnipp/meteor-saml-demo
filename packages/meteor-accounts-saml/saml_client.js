export function performPendingLogin() {
  const samlProfileId = localStorage.getItem("_saml.temporaryProfileId");

  if (samlProfileId) {
    localStorage.removeItem("_saml.temporaryProfileId");
    Accounts.callLoginMethod({ methodArguments: [{ samlProfileId }] });
  }
}

Meteor.startup(() => {
  if (!Meteor.settings.public.saml?.performPendingLoginManually) {
    performPendingLogin();
  }
});
