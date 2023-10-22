/*
 * Purpose: handles delete requests
 * 1. get the striked/marked item
 * 2. find the item in the data base
 * 3. delete the item property i.e done = true/false
 * 4. redirect the route to home route
 */

import express from "express";
import debug from "debug";
("app:deleteTaskRouter");
import fs from "fs";

//set the route to the express router function
const deleteTaskRouter = express.Router();

// data source of our tasks
import data from "../data/tasks.json" assert { type: "json" };

//routing delete route to delete a checked item
deleteTaskRouter.route("/delete/:id").delete(async (req, res) => {
  const itemId = req.params.id;
  console.log(data.tasks);

  const foundTask = data.tasks.findIndex((item) => item.id === itemId);
  try {
    console.log(foundTask);
    data.tasks.splice(foundTask, 1);
    
    const jsonFile = fs.createWriteStream("src/data/tasks.json");
    // Write the modified buffer to the file
    jsonFile.write(JSON.stringify(data));
    // Close the file.
    jsonFile.end();
  } catch (error) {
    console.log(error);
  }
  res.send({ task: foundTask });
});

export default deleteTaskRouter;
