// const express = require('express');
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameters.js";
import WorkingWithObjects from "./Lab5/WorkingWithObjects.js";
import WorkingWithModules from "./Lab5/WorkingWithModules.js";
import CourseRoutes from "./Courses/routes.js"
import ModuleRoutes from "./modules/routes.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";
import AssingmentsRoutes from "./Assignments/routes.js";
import UserRoutes from "./Users/routes.js";
import cors from 'cors';
import session from "express-session";
const app = express();
const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING,{ 
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  bufferCommands: false 
});

const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));


app.use(cors({
  credentials: true,
  origin: process.env.NETLIFY_URL || "http://localhost:3000",
}
));
app.use(express.json());
CourseRoutes(app);
ModuleRoutes(app)
Hello(app);
Lab5(app);
PathParameters(app);
QueryParameters(app);
WorkingWithObjects(app);
WorkingWithModules(app);
WorkingWithArrays(app);
AssingmentsRoutes(app);
UserRoutes(app)
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});
