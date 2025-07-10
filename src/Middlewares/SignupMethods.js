const SignupPreCheck = async (Options, ProjectData, GeneratedID) => {
  try {
    let isExist = false;
    let idExist = false;

    let filterID = await ProjectData.AuthData.filter(
      (u) => u.ProjectPreferences.id === String(GeneratedID)
    );

    let filterEmail = await ProjectData.AuthData.filter(
      (u) => u.ProjectPreferences.Email === Options.ProjectPreferences.Email
    );
    let filterUsername = await ProjectData.AuthData.filter(
      (u) => u.ExtraFields.Username === Options.ExtraFields.Username
    );

    if (filterEmail.length != 0) {
      isExist = true;
    } else if (filterUsername.length != 0) {
      isExist = true;
    } else if (filterID.length != 0) {
      idExist = true;
    }
    if (isExist) {
      return 409;
    } else if (idExist) {
      return 400;
    } else {
      return 200;
    }
  } catch (err) {
    return 400;
  }
};

export { SignupPreCheck };
