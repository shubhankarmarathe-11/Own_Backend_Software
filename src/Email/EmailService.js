import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

class EmailService {
  #ProjectName;

  #PORT = 587;
  #host = "smtp.gmail.com";
  #secure = false;
  #requireTLS = true;
  #auth = {
    user: process.env.EmailServiceUsername,
    pass: process.env.EmailServicePass,
  };

  #from_name;
  #from_Address = process.env.EmailServiceUsername;
  #To_Email;
  #To_Subject;

  constructor(TO_Email, TO_Subject, Projectname) {
    this.#To_Email = TO_Email;
    this.#To_Subject = TO_Subject;
    this.#ProjectName = Projectname;
  }

  async SendOtp(Generated_OTP) {
    var transpoter = await nodemailer.createTransport({
      host: this.#host,
      port: this.#PORT,
      secure: this.#secure,
      requireTLS: this.#requireTLS,
      auth: this.#auth,
    });

    var mailOptions = {
      from: {
        name: this.#ProjectName,
        address: this.#from_Address,
      },
      to: this.#To_Email,
      subject: this.#To_Subject,
      text: `The OTP Verification From ${
        this.#ProjectName
      } OTP - ${Generated_OTP} , Please Do Not Share This OTP ....`,
    };
    try {
      await transpoter.sendMail(mailOptions);
      return 200;
    } catch (error) {
      console.log(error);
      return 400;
    }
  }

  async SendMessage(To_text) {
    var transpoter = await nodemailer.createTransport({
      host: this.#host,
      port: this.#PORT,
      secure: this.#secure,
      requireTLS: this.#requireTLS,
      auth: this.#auth,
    });

    var mailOptions = {
      from: {
        name: this.#ProjectName,
        address: this.#from_Address,
      },
      to: this.#To_Email,
      subject: this.#To_Subject,
      text: To_text,
    };

    try {
      await transpoter.sendMail(mailOptions);
      return 200;
    } catch (error) {
      console.log(error);
      return 400;
    }
  }
}

export { EmailService };
