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

// DATABASE CONSTANTS
import DBStorage from "../data/database.js";
const dbName = "todoapp";
const uri = `mongodb://127.0.0.1:27017`;
const dbStorage = new DBStorage(uri, dbName);

//routing delete route to delete a checked item
deleteTaskRouter.route("/delete/:id").delete(async (req, res) => {
  const itemId = req.params.id;
  console.log(data.tasks);

  const foundTask = data.tasks.findIndex((item) => item._id === itemId);
  try {
    console.log(foundTask);
    data.tasks.splice(foundTask, 1);
    
    const jsonFile = fs.createWriteStream("src/data/tasks.json");
    // Write the modified buffer to the file
    jsonFile.write(JSON.stringify(data));
    // Close the file.
    jsonFile.end();

    // CONNECT TO MONGODB
    await dbStorage.connect();
    // query db and delete
    let deletedItem = await dbStorage.deleteData({_id: itemId});
    // disconnect db
    
    console.log(deletedItem);
  } catch (error) {
    console.log(error);
  }
  await dbStorage.disconnect();
  res.send({ task: foundTask });
});

export default deleteTaskRouter;
