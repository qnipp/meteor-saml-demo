import { Meteor } from "meteor/meteor";
import { Random } from "meteor/random";

// Exported for testing
export const VALIDITY_PERIOD = 60000;

const profiles = new Set();

export function saveProfile(profile) {
  const id = Random.id();
  profiles.add({
    id,
    profile,
    savedAt: Date.now(),
  });
  return id;
}

export function getAndDeleteProfile(id) {
  const startOfValidityPeriod = Date.now() - VALIDITY_PERIOD;
  const entry = Array.from(profiles).find(
    (p) => p.id === id && p.savedAt > startOfValidityPeriod
  );
  if (entry) {
    profiles.delete(entry);
  }
  return entry?.profile;
}

function cleanProfiles() {
  const startOfDoubleValidityPeriod = Date.now() - 2 * VALIDITY_PERIOD;

  let count = 0;
  profiles.forEach((p) => {
    if (p.savedAt < startOfDoubleValidityPeriod) {
      profiles.delete(p);
      count++;
    }
  });

  if (count) {
    console.log(
      `meteor-accounts-saml: ${count} old and unused SAML profiles removed.`
    );
  }
}

Meteor.setInterval(cleanProfiles, VALIDITY_PERIOD);
