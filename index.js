import express from "express";
import cors from "cors";
import mongoose, { Mongoose } from "mongoose";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import dotenv from "dotenv";

// Routes

import { MasterRoute } from "./src/modules/MasterAuth/master_auth.routes.js";
import { DashboardRoute } from "./src/modules/UserDashboard/userDashboard.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

const Dbconnect = async () => {
  await mongoose.connect(`${process.env.MONGO_URI}`);
  console.log("Connected");
};

Dbconnect();

app.get("/", (req, res) => {
  res.send("Working");
});

app.use("/api", MasterRoute);
app.use("/api", DashboardRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
