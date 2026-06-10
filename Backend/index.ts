import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import ConnectMongo from "./config/mongoDB.ts";

import { globalRoute } from "./Routes/globalRoute.ts";

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT ? process.env.PORT : "") || 3002;

const isProduction = process.env.NODE_ENV === "production";

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: isProduction ? ["Content-Type", "Authorization"] : "*",
    credentials: isProduction ? true : false,
  }),
);

ConnectMongo();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", globalRoute);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is Running on http://localhost:${port}`);
});
