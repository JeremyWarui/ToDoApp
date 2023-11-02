import express from "express";
import debug from "debug";
("app:completedTasksRouter");

const completedTasksRouter = express.Router();

// import json file
import data from "../data/tasks.json" assert { type: "json" };

// database
import DBStorage from "../data/database.js";
const dbName = "todoapp";
const uri = `mongodb://127.0.0.1:27017`;
const dbStorage = new DBStorage(uri, dbName);

//routing index router to serve home page
completedTasksRouter.route("/completed").get(async (req, res) => {
  // data source of our tasks
  let tasks;
  try {
    // file database
    tasks = data.tasks;
    tasks = tasks.filter((task) => task.completed === true);

    // connect to database
    await dbStorage.connect();
    // query database with documents that are completed
    tasks = await dbStorage.getCompletedTasks();
    console.log(tasks);
    await dbStorage.disconnect();
    } catch (error) {
    debug(error);
  } finally {
    res.render("index", { tasks });
  }
  res.render("index", { tasks });
});

export default completedTasksRouter;
