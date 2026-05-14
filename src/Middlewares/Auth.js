import { VerifyToken } from "../utils/jwt.js";

const VerifyUserToken = async (req, res, next) => {
  try {
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("please login back");

    let result;
    result = await VerifyToken(String(token));
    if (result.status == true) {
      return next();
    }

    return res.status(401).send("Token expired please login back");
  } catch (error) {
    res.status(503).send("Please try again ");
  }
};

export { VerifyUserToken };
