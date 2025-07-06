const SignupPreCheck = async (Options, ProjectData) => {
  try {
    let isExist = false;
    await ProjectData.AuthData.map((u) => {
      if (u.ProjectPreferences.Email === Options.ProjectPreferences.Email) {
        isExist = true;
      }
      if (
        (Options.ExtraFields.Username != null || undefined) &&
        u.ExtraFields.Username === Options.ExtraFields.Username
      ) {
        isExist = true;
      }
    });
    if (isExist) {
      return 409;
    } else {
      return 200;
    }
  } catch (err) {
    return 400;
  }
};

export { SignupPreCheck };
