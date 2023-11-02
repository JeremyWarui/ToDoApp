import express from "express";
import debug from "debug";
("app:activeTasksRouter");

const activeTasksRouter = express.Router();

// import json file
import data from "../data/tasks.json" assert { type: "json" };

// database constants
// database
import DBStorage from "../data/database.js";
const dbName = "todoapp";
const uri = `mongodb://127.0.0.1:27017`;
const dbStorage = new DBStorage(uri, dbName);

//routing index router to serve home page
activeTasksRouter.route("/active").get(async (req, res) => {
  // data source of our tasks
  let tasks;
  try {
    tasks = data.tasks;
    tasks = tasks.filter((task) => task.completed === false);

    // connect to mongoDB
    await dbStorage.connect();
    // query database
    tasks = await dbStorage.getActiveTasks();
    console.log(tasks);
  } catch (error) {
    debug(error);
  } finally {
    res.render("index", { tasks });
  }
  res.render("index", { tasks });
});

export default activeTasksRouter;
