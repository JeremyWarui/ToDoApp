/*
 * Purpose: handles update requests
 * 1. get the striked/marked item
 * 2. find the item in the data base
 * 3. update the item property i.e done = true/false
 * 4. redirect the route to home route
 */

import express from "express";
import debug from "debug";
("app:updateTaskRouter");
import fs from "fs";
import DBStorage from "../data/database.js";
//set the route to the express router function
const updateTaskRouter = express.Router();

// data source of our tasks
import data from "../data/tasks.json" assert { type: "json" };
const dbName = "todoapp";
const uri = `mongodb://127.0.0.1:27017`;
const dbStorage = new DBStorage(uri, dbName);

//routing index router to serve home page
updateTaskRouter.route("/update/:id").put(async (req, res) => {
  const itemId = req.params.id;
  console.log(data.tasks);
  console.log(req.body);
  let itemToUpdate = req.body;
  console.log(itemId);
  console.log(itemToUpdate.completed);
  const foundTask = data.tasks.find((item) => item._id === itemId);
  try {
    if (foundTask) foundTask.completed = !foundTask.completed;
    // console.log(foundTask);
    const jsonFile = fs.createWriteStream("src/data/tasks.json");
    // Write the modified buffer to the file
    jsonFile.write(JSON.stringify(data));
    // Close the file.
    jsonFile.end();

    // connect to database
    await dbStorage.connect();
    // // update task
    await dbStorage.updateData(
      { _id: itemId },
      { $set: { completed: itemToUpdate.completed } }
    );
    await dbStorage.disconnect();
  } catch (error) {
    console.log(error);
  }
  res.send({ task: data.tasks });
});

export default updateTaskRouter;
