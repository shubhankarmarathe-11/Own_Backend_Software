import express from "express";
import cors from "cors";
import mongoose, { Mongoose } from "mongoose";
import bodyParser from "body-parser";
import { ConnectProject } from "./src/Routes/DashBoard.js";
import { SignupRoute } from "./src/Routes/SignupRoute.js";
import { Login } from "./src/Routes/LoginRoute.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Dbconnect = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/SAAS");
  console.log("Connected");
};

Dbconnect();

app.use(ConnectProject);
app.use(SignupRoute);
app.use(Login);

app.get("/", (req, res) => {
  res.send("Working");
});

app.listen(PORT, () => {
  console.log("Server Started at 3000");
});
