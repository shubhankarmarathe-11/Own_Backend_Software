import { ProjectTable, ProjectDataTable } from "../DataBase/DBSchema.js";

const CheckPref = async (req, res, next) => {
  let { ProjectID, Options } = req.body;
  let FindProj = await ProjectTable.findById(ProjectID);

  if (
    (Object.keys(FindProj.ProjectPreferences).length ===
      Object.keys(Options.ProjectPreferences).length &&
      Options.ExtraFields != null) ||
    undefined
  ) {
    //
    let newarr = await Object.keys(FindProj.ExtraFields).filter(
      (u) => FindProj.ExtraFields[String(u)] == true
    );

    if (newarr.length == Object.keys(Options.ExtraFields).length) {
      next();
    } else {
      res.status(400).send("Please Enter Valid Options ");
    }
  } else {
    res.status(400).send("Please Enter Valid Options ");
  }
};

const EmailCheck = async (req, res, next) => {
  let { Options } = req.body;

  if (String(Options.ProjectPreferences.Email).includes("@gmail.com")) {
    next();
  } else {
    res.status(400).send("Please Enter Proper Gmail");
  }
};
const PasswordCheck = async (req, res, next) => {
  let { Options } = req.body;

  if (String(Options.ProjectPreferences.Password).length >= 8) {
    next();
  } else {
    res.status(400).send("Password Must be greater than 8 characters");
  }
};
const MobileNo = async (req, res, next) => {
  let { Options } = req.body;
  if (Options.ExtraFields.MobileNo != null || undefined) {
    if (String(Options.ExtraFields.MobileNo).length == 10) {
      next();
    } else {
      res.status(400).send("Please Enter Proper Number");
    }
  } else {
    next();
  }
};

export { CheckPref, EmailCheck, PasswordCheck, MobileNo };
