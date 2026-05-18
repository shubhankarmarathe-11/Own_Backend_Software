import express from "express";
import { validateGoogleToken } from "../middleware/ValidateOauthToken.ts";
import { GoogleTokenController } from "../controller/MasterAuth/OauthController.ts";
import { LoginController } from "../controller/MasterAuth/LoginController.ts";
import { SignupController } from "../controller/MasterAuth/SignupController.ts";
import { LogoutController } from "../controller/MasterAuth/LogutController.ts";
import { DeleteUserController } from "../controller/MasterAuth/DeleteAccount.ts";
import ValidateRefreshToken from "../middleware/ValidateRefreshToken.ts";

const MasterAuthRoute = express.Router();

MasterAuthRoute.get("/master", (req, res) => {
  res.send("masterauth");
});

MasterAuthRoute.post("/master/login", LoginController);
MasterAuthRoute.post("/master/signup", SignupController);
MasterAuthRoute.post(
  "/master/oauth",
  validateGoogleToken,
  GoogleTokenController,
);
MasterAuthRoute.post("/master/logout", ValidateRefreshToken, LogoutController);

MasterAuthRoute.delete(
  "/master/delete",
  ValidateRefreshToken,
  DeleteUserController,
);

// MasterAuthRoute.patch("/master/forgetpassword");
// MasterAuthRoute.patch("/master/update");

export { MasterAuthRoute };
