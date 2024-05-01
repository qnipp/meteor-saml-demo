import { Meteor } from "meteor/meteor";
import assert from "assert";
import { getAndDeleteProfile, saveProfile, VALIDITY_PERIOD } from "./profiles";

function timeout(delay) {
  return new Promise((resolve) => {
    Meteor.setTimeout(resolve, delay);
  });
}

describe("profiles", async function () {
  it("stores and retrieves a profile", async function () {
    const profile = { test: "abc" };
    const id = saveProfile(profile);
    assert.strictEqual(getAndDeleteProfile(id), profile);
  });

  it("does not retrieve a profile for an unknown id", async function () {
    assert.strictEqual(getAndDeleteProfile("unknown"), undefined);
  });

  it("does not retrieve a profile for an old id", async function () {
    VALIDITY_PERIOD = 1000;
    const profile = { test: "abc" };
    const id = saveProfile(profile);
    await timeout(2 * VALIDITY_PERIOD);
    assert.strictEqual(getAndDeleteProfile("unknown"), undefined);
  });
});
