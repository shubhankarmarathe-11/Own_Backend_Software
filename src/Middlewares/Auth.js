import { VerifyToken } from "../utils/jwt.js";
import { UserAuthInformation } from "../Schemas/UserAuthInformation.js";

const VerifyUserToken = async (req, res, next) => {
  try {
    let { Token, ProjectID } = req.body;

    let isalive = await VerifyToken(Token);
    if (isalive.status == true) {
      let FindData = await UserAuthInformation.findOne({
        ProjectID: ProjectID,
        "AuthData._id": isalive.payload.id,
      });
      if (FindData != null || FindData != undefined) {
        req.id = isalive.payload.id;
        next();
      } else {
        res.status(401).send("User Not Found ... ");
      }
    } else {
      res.status(401).send("Token expired Please Login Again ..");
    }
  } catch (error) {
    res.status(503).send("Please try again ");
  }
};

export { VerifyUserToken };
