import { ProjectTable, ProjectDataTable } from "../DataBase/DBSchema.js";

async function CheckEmailApplicable(req, res, next) {
  try {
    let { Options } = req.body;
    let FindProj = await ProjectTable.findById(Options.ProjectID);
    let findauthdata = await ProjectDataTable.findOne({
      Projectid: Options.ProjectID,
    });
    let newdata = await findauthdata.AuthData.filter(
      (u) => u.ProjectPreferences.Email == Options.EmailInfo.UserEmail
    );
    if (FindProj.ExtraServices.MailService != false && newdata.length != 0) {
      next();
    } else {
      res.status(406).send("You Can't Use Email Service");
    }
  } catch (error) {
    res.status(400).send("Please try again ...");
  }
}

export { CheckEmailApplicable };
