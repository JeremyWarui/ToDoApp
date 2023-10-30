import express from "express";
import debug from "debug";
("app:activeTasksRouter");

const activeTasksRouter = express.Router();

// import json file
import data from "../data/tasks.json" assert { type: "json" };

//routing index router to serve home page
activeTasksRouter.route("/active").get(async (req, res) => {
  // data source of our tasks
  let tasks;
  try {
    tasks = data.tasks;
    tasks = tasks.filter((task) => task.completed === false);
  } catch (error) {
    debug(error);
  } finally {
    res.render("index", { tasks });
  }
  res.render("index", { tasks });
});

export default activeTasksRouter;
