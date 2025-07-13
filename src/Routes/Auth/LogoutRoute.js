import express from "express";
import { BlaklistTokenonLogout } from "../../JWT/SignToken.js";

const LogoutRoute = express.Router();

LogoutRoute.post("/api/Logout", async (req, res) => {
  let { Token } = req.body;
  let result = await BlaklistTokenonLogout(Token);
  if (result == true) {
    res.status(200).send("Logged Out");
  } else {
    res.status(400).send("Please try Again ...");
  }
});

export { LogoutRoute };
