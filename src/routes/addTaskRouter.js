/*
 * Purpose: handles post requests
 * 1. get the new item from frontend
 * 2. set the new item in a  {task, done} object
 * 3. add the new item in the data json array
 * 4. redirect the route to home route
 */

import express from "express";
import debug from "debug";
("app:addTaskRouter");
import fs from "fs";
import { nanoid } from "nanoid";

// data source of our tasks
import data from "../data/tasks.json" assert { type: "json" };

//set the route to the express router function
const addTaskRouter = express.Router();
import DBStorage from "../data/database.js";

//routing index router to serve home page
addTaskRouter.route("/add").post(async (req, res) => {
  const dbName = "todoapp";
  const uri = `mongodb://127.0.0.1:27017`;
  const dbStorage = new DBStorage(uri, dbName);
  const newItem = req.body.task;
  // add the new item
  let newtask = {
    _id: nanoid(12),
    task: newItem,
    completed: false,
  };
  //add new item in the data array
  try {
    data.tasks.push(newtask);
    //write new item in the data file
    fs.writeFileSync("src/data/tasks.json", JSON.stringify(data));

    // connect to database
    await dbStorage.connect();
    // add new task
    let newTask = await dbStorage.addNewData(newtask);
    console.log(`Added "${newTask}" successfully`);
  } catch (error) {
    console.log(error);
  }
  finally {
    await dbStorage.disconnect();
    res.json({'task': newtask.task});
  }

 
});

export default addTaskRouter;
