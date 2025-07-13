import { ProjectTable, ProjectDataTable } from "../DataBase/DBSchema.js";

const CreateDataBase = async (
  options = {
    ProjectName: "",
    ProjectPref: { Email: true, Password: true },
    ExtraField: {
      Username: false,
      MobileNo: false,
      Address: false,
    },
    ExtraServices: {
      MailService: false,
    },
  }
) => {
  try {
    const FindProjectName = await ProjectTable.findOne({
      ProjectName: options.ProjectName,
    });
    if (options.ProjectName !== "" && FindProjectName == (null || undefined)) {
      // Creating Table For Project
      let CreateTable = await ProjectTable.create({
        ProjectName: options.ProjectName,
        ProjectPreferences: options.ProjectPref,
        ExtraFields: options.ExtraField,
        ExtraServices: options.ExtraServices,
      });
      CreateTable.save();

      // Create Table For Auth Data
      let CreateDataTable = await ProjectDataTable.create({
        Projectid: CreateTable._id,
      });
      CreateDataTable.save();

      let update = await ProjectTable.findByIdAndUpdate(CreateTable._id, {
        $push: { ProjectData: CreateDataTable._id },
      });

      return { status: true, ProjectID: CreateTable._id };
    }
    return { status: false, ProjectID: null };
  } catch (error) {
    return { status: false, ProjectID: null };
  }
};

export { CreateDataBase };
