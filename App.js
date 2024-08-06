import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5/index.js";
import PathParameters from "./Lab5/PathParameters.js";
import QueryParameters from "./Lab5/QueryParameters.js";
import WorkingWithObjects from "./Lab5/WorkingWithObjects.js";
import WorkingWithModules from "./Lab5/WorkingWithModules.js";
import CourseRoutes from "./Kanbas/Courses/routes.js"
import ModuleRoutes from "./Kanbas/Modules/routes.js";
import WorkingWithArrays from "./Lab5/WorkingWithArrays.js";
import AssingmentsRoutes from "./Kanbas/Assignment/routes.js";
import cors from 'cors';
const app = express();
app.use(cors());
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
app.listen(process.env.PORT || 4000, () => {
  console.log("Server is listening on port 4000");
});
