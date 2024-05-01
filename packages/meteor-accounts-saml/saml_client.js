Meteor.startup(() => {
  const samlProfileId = localStorage.getItem("_saml.temporaryProfileId");
  localStorage.removeItem("_saml.temporaryProfileId");

  if (samlProfileId) {
    Accounts.callLoginMethod({ methodArguments: [{ samlProfileId }] });
  }
});
