import express from "express";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import GradesRoutes from "./grades/routes.js"
import GradestableHeadRoutes from "./gradestableHead/routes.js";
import "dotenv/config";

const app = express();
import cors from "cors";
app.use(cors());
app.use(express.json());
ModuleRoutes(app);
AssignmentRoutes(app);
GradesRoutes(app);
CourseRoutes(app);
GradestableHeadRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);

