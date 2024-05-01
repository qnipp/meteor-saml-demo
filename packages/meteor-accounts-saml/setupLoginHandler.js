import { getAndDeleteProfile } from "./profiles";

Accounts.registerLoginHandler("saml", ({ samlProfileId } = {}) => {
  if (!samlProfileId) return;

  const assertion = getAndDeleteProfile(samlProfileId);

  if (!assertion) return;

  if (assertion.loggedOut) return;

  const { profile, idp } = assertion;

  const serviceData = {
    ...profile.attributes,
    id: profile.nameID,
  };

  const options = profile;

  return Accounts.updateOrCreateUserFromExternalService(
    idp,
    serviceData,
    options
  );
});
