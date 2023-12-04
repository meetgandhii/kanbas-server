import express from "express";
import session from "express-session";
import Hello from "./hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoutes from "./assignments/routes.js";
import GradesRoutes from "./grades/routes.js"
import GradestableHeadRoutes from "./gradestableHead/routes.js";
import UserRoutes from "./users/routes.js";

import "dotenv/config";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas';
mongoose.connect(CONNECTION_STRING);

const db = mongoose.connection;
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
});

const app = express();
import cors from "cors";
app.use(cors(
  {
    credentials: true,
    origin: process.env.FRONTEND_URL

  }
));
const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}
app.use(session(sessionOptions));


app.use(express.json());
ModuleRoutes(app);
AssignmentRoutes(app);
GradesRoutes(app);
CourseRoutes(app);
UserRoutes(app);
GradestableHeadRoutes(app);
Lab5(app);
Hello(app);
app.listen(process.env.PORT || 4000);

