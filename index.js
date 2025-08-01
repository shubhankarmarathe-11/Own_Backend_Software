import express from "express";
import cors from "cors";
import mongoose, { Mongoose } from "mongoose";
import bodyParser from "body-parser";
import {
  ConnectProject,
  IsActiveRoute,
  Login,
  SignupRoute,
  LogoutRoute,
} from "./src/Routes/Auth/ExportAuthRoutes.js";

import {
  InsertRoute,
  RetriveDataRoute,
  DeleteDataRoute,
  UpdateDataRoute,
} from "./src/Routes/UserDataStore/ExportDataRoutes.js";

import { EmailServiceRoute } from "./src/Routes/EmailServiceRoute.js";

import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Dbconnect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/SAAS");
  console.log("Connected");
};

Dbconnect();

// Auth Routes

app.use(ConnectProject);
app.use(SignupRoute);
app.use(Login);
app.use(IsActiveRoute);
app.use(LogoutRoute);

//Email Route

app.use(EmailServiceRoute);

// CURD Operation on User Data Routes

app.use(InsertRoute);
app.use(RetriveDataRoute);
app.use(DeleteDataRoute);
app.use(UpdateDataRoute);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
