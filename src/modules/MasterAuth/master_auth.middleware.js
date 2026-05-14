import {
  ValidateEmail,
  ValidateNumber,
  Validatepassword,
} from "../../utils/FormatChecker.js";

import { MasterAuth } from "./master_auth.model.js";

//login
const LoginMiddleware = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    let result;

    result = await ValidateEmail(String(email));
    if (result == false)
      return res.status(406).send("please enter valid email");
    result = await Validatepassword(String(password));
    if (result == false)
      return res.status(406).send("please password more than 7 characters");

    result = await MasterAuth.findOne({ Email: email });

    if (result != null) return next();

    return res.status(406).send("User Not Found");
  } catch (error) {
    return res.status(400).send("please try again");
  }
};

// signup
const SignupMiddleware = async (req, res, next) => {
  try {
    let { username, email, number, password } = req.body;
    let result;

    result = await ValidateEmail(String(email));
    if (result == false)
      return res.status(406).send("please enter valid email");
    result = await ValidateNumber(String(number));
    if (result == false)
      return res
        .status(406)
        .send("please enter proper mobile number or without country code");
    result = await Validatepassword(String(password));
    if (result == false)
      return res.status(406).send("please password more than 7 characters");

    result = await MasterAuth.findOne({ Email: email });

    if (result == null) return next();

    return res.status(406).send("Email already register");
  } catch (error) {
    console.log(error);

    return res.status(400).send("please try again**");
  }
};

export { LoginMiddleware, SignupMiddleware };
