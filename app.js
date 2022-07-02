//jsversion:es6

const express = require("express");
const app = express();
const port = 8080;

// app to use ejs
app.set("view engine", "ejs");

// express to use public files
app.use(express.static("public"));

// app gettting resources

app.get("/", async (req, res) => {
  res.render("index");
});

// serving the app
app.listen(port, () => console.log(`Server listening on ${port}`));
