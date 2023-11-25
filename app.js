//jsversion:es6

import express from "express";
import debug from "debug";
("app");
import morgan from "morgan";
/* THE ROUTES FILES */
import router from "./src/routes/index.js";

// INITIALISE EXPRESS AND ROUTER
const app = express();
const PORT = process.env.PORT || 8080;

/* THE APP MIDDLE WARES
 * 1. Morgan
 * 2. express static files
 * 3. body parser
 * 4. cookie parser
 */
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* APP SETTINGS OR SETS EG EJS
 * 1. setting a view folder to be used by ejs
 * 2. setting the view engine using ejs
 */
app.set("views", "./src/views");
app.set("view engine", "ejs");

// use indexrouter middleware
app.use("/", router);
// // use addTaskRouter middleware
// app.use("/", addTaskRouter);
// // use updateTaskRouter to update the tasks
// app.use("/", updateTaskRouter);
// // use deleteTaskRouter middleware
// app.use("/", deleteTaskRouter);
// // use completedTasksRouter middleware
// app.use("/", completedTasksRouter);
// // use activeTasksRouter middleware
// app.use("/", activeTasksRouter);

// serving the app
app.listen(PORT, () => {
  debug(`App served from port ${PORT}`);
  console.log(`App served from port ${PORT}`);
});
