Accounts.setAdditionalFindUserOnExternalLogin(
  ({ serviceName, serviceData, options }) => {
    console.log("setAdditionalFindUserOnExternalLogin", {
      serviceName,
      serviceData,
      options,
    });

    // look for an existing user id in any case
    const existingUser = Meteor.users.findOne({
      [`services.${serviceName}.id`]: {
        $regex: `^${serviceData.id}$`,
        $options: "i",
      },
    });

    if (existingUser) {
      console.log("Existing user found", existingUser);
    }

    return existingUser ?? undefined;
  }
);

Accounts.beforeExternalLogin((type, data, user) => {
  console.log("beforeExternalLogin", { type, data, user });
  return true;
});

Accounts.onCreateUser((options, user) => {
  console.log("onCreateUser", { options, user });

  const newUser = { ...user };

  // set username for new users
  if (options.nameID) {
    newUser.username = options.nameID.toLowerCase();
  }

  // change id in service to lower-case for SAML users
  const serviceName = Object.keys(user.services)[0];
  if (Meteor.settings.saml[serviceName]) {
    newUser.services[serviceName].id =
      newUser.services[serviceName].id.toLowerCase();
  }

  return newUser;
});

Accounts.validateNewUser((user) => {
  console.log("validateNewUser", { user });
  return true;
});

Accounts.validateLoginAttempt(
  ({ type, allowed, error, user, methodName, methodArguments }) => {
    console.log("validateLoginAttempt", {
      type,
      allowed,
      error,
      user,
      methodName,
      methodArguments,
    });
    return true;
  }
);

Accounts.onLogin(
  ({ type, allowed, error, user, methodName, methodArguments }) => {
    console.log("onLogin", {
      type,
      allowed,
      error,
      user,
      methodName,
      methodArguments,
    });

    // find profile fields in user.services

    const setProfile = {};

    for (const key in user.services) {
      const service = user.services[key];
      for (const field in service) {
        if (
          field === "firstName" ||
          field === "givenName" ||
          field === "givenname"
        ) {
          setProfile["profile.firstName"] = service[field];
        } else if (field === "lastName" || field === "sn") {
          setProfile["profile.lastName"] = service[field];
        }
      }
    }

    Meteor.users.update(user._id, { $set: setProfile });
  }
);
