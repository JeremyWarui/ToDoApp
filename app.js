//jsversion:es6

import express from "express";
import debug from "debug"; ("app");
import morgan from "morgan";
import { nanoid } from "nanoid";
import fs from "fs";
/* THE ROUTES FILES
 * 1. index router
 * 2. tasks router
 */
import indexRouter from "./src/routes/indexRouter.js";
import addTaskRouter from "./src/routes/addTaskRouter.js";
import updateTaskRouter from "./src/routes/updateTaskRouter.js";
// data source of our tasks
import data from "./src/data/tasks.json" assert { type: "json" };

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

// app gettting resources

// app.get("/", async (req, res) => {
//   res.render("index", { items });
// });

//use indexrouter middleware
app.use("/", indexRouter);
//use addTaskRouter middleware
app.use("/", addTaskRouter);
// app.post('/add', (req, res) => {
//   const newItem = req.body.task;
//   console.log(newItem);
//   // add the new item
//   let newtask = {
//     id: nanoid(12),
//     task: newItem,
//     completed: false,
//   };
//   //add new item in the data array
//   try {
//     data.tasks.push(newtask);
//     //write new item in the data file
//     fs.writeFileSync("src/data/tasks.json", JSON.stringify(data));

//     console.log(`Added "${newtask["task"]}" successfully`);
//   } catch (error) {
//     console.log(error);
//   }
//   finally {
//     // res.json({'task': newtask.task});
//     // res.redirect('/');
//     res.send({'task': newtask});
//   }
// });
//use updateTaskRouter to update the tasks
app.use("/", updateTaskRouter);

// serving the app
app.listen(PORT, () => {
  debug(`App served from port ${PORT}`);
});
