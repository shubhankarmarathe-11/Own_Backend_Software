import express from "express";
import { VerifyToken } from "../../JWT/SignToken.js";

const IsActiveRoute = express.Router();

IsActiveRoute.post("/api/IsActive", async (req, res) => {
  try {
    let { Token } = req.body;

    let isVerified = await VerifyToken(Token);
    if (isVerified == true) {
      res.status(200).send({ IsActive: true });
    } else {
      res.status(401).send({ IsActive: false });
    }
  } catch (error) {
    res.status(400).send("Please try again ...");
  }
});

export { IsActiveRoute };
