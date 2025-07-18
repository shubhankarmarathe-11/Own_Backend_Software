import express from "express";
import { ProjectTable } from "../DataBase/DBSchema.js";
import { EmailService } from "../Email/EmailService.js";
import { CheckEmailApplicable } from "../Middlewares/EmailServiceMiddleware.js";

const EmailServiceRoute = express.Router();

// One Route For OTP SENDING

let Otp = 0;

EmailServiceRoute.post(
  "/api/SendOTP",
  CheckEmailApplicable,
  async (req, res) => {
    let { Options } = req.body;
    try {
      let FindProj = await ProjectTable.findById(Options.ProjectID);

      let SendEmail = new EmailService(
        Options.EmailInfo.UserEmail,
        Options.EmailInfo.Subject,
        FindProj.ProjectName
      );
      let OTP = Math.floor(100000 + Math.random() * 900000);

      let result = await SendEmail.SendOtp(OTP);

      if (result == 200) {
        Otp = OTP;
        res.status(200).send("Email Sent");
      } else {
        res.status(400).send("Please try Again ... *");
      }
    } catch (error) {
      res.status(400).send("Please try Again ... ** ");
    }
  }
);

EmailServiceRoute.post("/api/CheckOTP", async (req, res) => {
  let { CheckOTP } = req.body;
  if (Otp != 0 && CheckOTP === Otp) {
    res.status(200).send("Correct Otp");
  } else if (Otp != 0 && CheckOTP != Otp) {
    res.status(406).send("Wrong Otp");
  } else {
    res.status(400).send("Please try again ....");
  }
});

// Another Route For General Purpose Mail.  Which Include Messages Sended To User By The Projects.

EmailServiceRoute.post(
  "/api/SendMessage",
  CheckEmailApplicable,
  async (req, res) => {
    let { Options } = req.body;
    try {
      let FindProj = await ProjectTable.findById(Options.ProjectID);

      let SendEmail = new EmailService(
        Options.EmailInfo.UserEmail,
        Options.EmailInfo.Subject,
        FindProj.ProjectName
      );

      let result = await SendEmail.SendMessage(Options.EmailInfo.Para);

      if (result == 200) {
        res.status(200).send("Message sent through Email ....");
      } else {
        res.status(400).send("Please try Again ... *");
      }
    } catch (error) {
      res.status(400).send("Please try Again ... ** ");
    }
  }
);

export { EmailServiceRoute };
