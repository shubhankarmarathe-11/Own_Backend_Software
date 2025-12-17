import express from "express";
import cors from "cors";
import mongoose, { Mongoose } from "mongoose";
import bodyParser from "body-parser";

import dotenv from "dotenv";

import {
  CreateProject,
  DeleteProjectRoute,
} from "./src/Routes/Project_Routes/ExportRoutes1.js";

import {
  SignupRoute,
  LoginRoute,
  RemoveAccountRoute,
  ResetPasswordRoute,
} from "./src/Routes/Auth/ExportRoutes2.js";

import {
  InsertDataRoute,
  RetriveDataRoute,
  UpdateDataRoute,
  DeleteDataRoute,
} from "./src/Routes/DataOperation/ExportRoutes3.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Dbconnect = async () => {
  await mongoose.connect(`${process.env.MONGO_URI}`);
  console.log("Connected");
};

Dbconnect();

app.get("/", (req, res) => {
  res.send("Working");
});

// CURD Project Routes

app.use(CreateProject);
app.use(DeleteProjectRoute);

// Auth Routes
app.use(SignupRoute);
app.use(LoginRoute);
app.use(RemoveAccountRoute);
app.use(ResetPasswordRoute);

// CURD Operation Routes for Data

app.use(InsertDataRoute);
app.use(RetriveDataRoute);
app.use(UpdateDataRoute);
app.use(DeleteDataRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

