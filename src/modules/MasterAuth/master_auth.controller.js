import { sendWelcomeEmail } from "../Email/email.services.js";
import {
  RegisterUser,
  ValidateCred,
  FindUserAndUpdate,
} from "./master_auth.services.js";
import { BlaklistTokenonLogout, VerifyToken } from "../../utils/jwt.js";

//login

const LoginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    let result;

    result = await ValidateCred({ email: email, password: password });

    if (result == null) return res.status(400).send("please try again");
    if (result == false) return res.status(400).send("Incorrect password");

    res.cookie("host_auth", String(result), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 60 * 1000,
    });

    res.status(201).send("user logged in");
  } catch (error) {
    return res.status(400).send("please try again");
  }
};

//signup

const SignupController = async (req, res) => {
  try {
    let { username, email, number, password } = req.body;
    let result;

    result = await RegisterUser({
      username: username,
      email: email,
      number: number,
      password: password,
    });

    if (result == null) return res.status(400).send("please try again");
    if (result == false) return res.status(400).send("please login back");

    res.cookie("host_auth", String(result), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 60 * 1000,
    });

    result = await sendWelcomeEmail({
      appName: "SAAS",
      firstName: String(username),
      to: String(email),
    });

    res.status(201).send("user register");
  } catch (error) {
    return res.status(400).send("please try again");
  }
};

//logout

const LogoutController = async (req, res) => {
  try {
    let token = req.cookies["host_auth"];
    let result = await BlaklistTokenonLogout(token);
    if (result == false) return res.status(406).send("please try again");

    res.clearCookie();
    return res.status(201).send("successfully logged out");
  } catch (error) {
    return res.status(400).send("please try again");
  }
};

// forgetPassword

const ForgotController = async (req, res) => {
  try {
  } catch (error) {
    return res.status(400).send("please try again");
  }
};

// changePassword

const ChangeUserDetail = async (req, res) => {
  try {
    let { username, email, number, password } = req.body;
    let token = req.cookies["host_auth"];
    if (token == undefined) return res.status(401).send("please login back");

    let result;
    result = await VerifyToken(String(token));
    if (result.status == true) {
      req.userId = String(result.payload.id);
      let update = await FindUserAndUpdate({
        _id: req.userId,
        username: username,
        email: email,
        number: number,
        password: password,
      });

      if (update == null) return res.status(401).send("please try again");

      return res.status(201).send("details updated successfully");
    }

    return res.status(401).send("Token expired please login back");
  } catch (error) {
    return res.status(400).send("please try again");
  }
};

export {
  LoginController,
  SignupController,
  LogoutController,
  ForgotController,
  ChangeUserDetail,
};
