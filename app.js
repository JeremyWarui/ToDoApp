//jsversion:es6

import express from "express";
import debug from "debug"; ("app");
import morgan from "morgan";

/* THE ROUTES FILES
 * 1. index router
 * 2. tasks router
 */
import indexRouter from "./src/routes/indexRouter.js";
import addTaskRouter from "./src/routes/addTaskRouter.js";
import updateTaskRouter from "./src/routes/updateTaskRouter.js";

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
app.use(express.urlencoded({ extended: false }));

/* APP SETTINGS OR SETS EG EJS
 * 1. setting a view folder to be used by ejs
 * 2. setting the view engine using ejs
 */
app.set("views", "./src/views");
app.set("view engine", "ejs");

// app gettting resources

// app.get("/", async (req, res) => {
//   res.render("index", { items });
// });

//use indexrouter middleware
app.use("/", indexRouter);
//use addTaskRouter middleware
app.use("/", addTaskRouter);
//use updateTaskRouter to update the tasks
app.use("/", updateTaskRouter);

// serving the app
app.listen(PORT, () => {
  debug(`App served from port ${PORT}`);
});
