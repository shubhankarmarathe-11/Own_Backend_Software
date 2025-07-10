import { ProjectTable } from "../DataBase/DBSchema.js";

async function CheckEmailApplicable(req, res, next) {
  try {
    let { Options } = req.body;
    let FindProj = await ProjectTable.findById(Options.ProjectID);
    if (FindProj.ExtraServices.MailService != false) {
      next();
    } else {
      res.status(406).send("You Can't Use Email Service");
    }
  } catch (error) {
    res.status(400).send("Please try again ...");
  }
}

export { CheckEmailApplicable };
