import { ProjectDataTable } from "../DataBase/DBSchema.js";
import bcrypt from "bcryptjs";

const LoginChecks = async (FindPRoject, ProjectData, Options) => {
  // You Need To Add Mobile Number Also For Future so you Need To CHeck The ExtraFields From FindProject

  try {
    let isExist = false;
    let PasswCorrect = false;
    let EmailText = "";
    if (String(Options.EmailOrName).includes("@gmail.com")) {
      EmailText = Options.EmailOrName;
    }
    await ProjectData.AuthData.map((u) => {
      if (u.ProjectPreferences.Email === EmailText && EmailText != "") {
        isExist = true;
      } else if (
        u.ExtraFields.Username === Options.EmailOrName &&
        EmailText == ""
      ) {
        isExist = true;
      }
    });

    for (let u of ProjectData.AuthData) {
      let ComparePass = await bcrypt.compare(
        String(Options.Password),
        String(u.ProjectPreferences.Password)
      );

      if (ComparePass) {
        PasswCorrect = true;
        break;
      } else {
        PasswCorrect = false;
      }
    }

    if (isExist && PasswCorrect) {
      console.log("Working1");
      return 200;
    } else {
      return 409;
    }
  } catch (err) {
    return 400;
  }
};

export { LoginChecks };
