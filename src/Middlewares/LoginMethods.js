import { ProjectDataTable } from "../DataBase/DBSchema.js";
import bcrypt from "bcryptjs";

const LoginChecks = async (FindPRoject, ProjectData, Options) => {
  // You Need To Add Mobile Number Also For Future so you Need To CHeck The ExtraFields From FindProject

  try {
    let PasswCorrect = false;
    let EmailText = "";
    let Userid = "";
    if (String(Options.EmailOrName).includes("@gmail.com")) {
      EmailText = Options.EmailOrName;
    }

    let filterEmail = await ProjectData.AuthData.filter(
      (u) => u.ProjectPreferences.Email === Options.EmailOrName
    );
    let filterUsername = await ProjectData.AuthData.filter(
      (u) => u.ExtraFields.Username === Options.EmailOrName
    );

    if (filterEmail.length != 0) {
      console.log(filterEmail[0]);
      Userid = filterEmail[0].id;
      let ComparePass = await bcrypt.compare(
        String(Options.Password),
        String(filterEmail[0].ProjectPreferences.Password)
      );

      if (ComparePass) {
        PasswCorrect = true;
      } else {
        PasswCorrect = false;
      }
    } else {
      console.log(filterUsername[0]);
      Userid = filterUsername[0].id;
      let ComparePass = await bcrypt.compare(
        String(Options.Password),
        String(filterUsername[0].ProjectPreferences.Password)
      );

      if (ComparePass) {
        PasswCorrect = true;
      } else {
        PasswCorrect = false;
      }
    }

    if (Userid != "" && PasswCorrect) {
      console.log("Working1");
      return { status: 200, Userid: Userid };
    } else {
      return { status: 409, Userid: "" };
    }
  } catch (err) {
    return { status: 400, Userid: "" };
  }
};

export { LoginChecks };
