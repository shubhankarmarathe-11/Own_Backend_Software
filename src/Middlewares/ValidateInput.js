import { UserAuthInformation } from "../Schemas/UserAuthInformation.js";

async function ValidateInput(req, res, next) {
  try {
    // Email Check

    let { Email, Password, MobileNumber } = req.body;
    console.log(MobileNumber);

    if (!String(Email).includes("@gmail.com")) {
      res.status(401).send("Please Enter Proper Email");
    }

    // Password Check
    else if (String(Password).length < 8) {
      res.status(401).send("Please Enter Proper Password. Min 8 Character");
    }

    // MobileNumber Check
    else if (String(MobileNumber).length !== 10) {
      res
        .status(401)
        .send("Please Enter Proper Mobile Number. or Remove Country code ");
    } else {
      next();
    }
  } catch (error) {
    res.status(503).send("Please try again");
  }
}

async function CheckEmail(req, res, next) {
  try {
    let { ProjectID, Email } = req.body;
    const existingUser = await UserAuthInformation.findOne({
      ProjectID: ProjectID,
      "AuthData.Email": Email,
    });

    if (existingUser) {
      res.status(409).send("Email Already Exists");
    } else {
      next();
    }
  } catch (error) {
    res.status(503).send("Please try again");
  }
}

export { ValidateInput, CheckEmail };
