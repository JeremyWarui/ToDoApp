//jsversion:es6

const express = require("express");
const debug = require("debug")("app");
const morgan = require("morgan");

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

//our items array

const items = [];

app.get("/", async (req, res) => {
  res.render("index", { items });
});

// add item to list
app.post("/", (req, res) => {
  const newItem = req.body.newItem;
  // console.log(newItem);
  // add the new item
  items.push(newItem);

  res.redirect("/");
});

// serving the app
app.listen(PORT, () => {
  debug(`App served from port ${PORT}`);
});
