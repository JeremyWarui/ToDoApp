import express from "express";
import debug from "debug";
("app:indexRouter");

const indexRouter = express.Router();

// import json file
import data from "../data/tasks.json" assert { type: "json" };
import DBStorage from "../data/database.js";

//routing index router to serve home page
indexRouter.route("/all").get(async (req, res) => {
  const dbName = "todoapp";
  const uri = `mongodb://127.0.0.1:27017`;
  const dbStorage = new DBStorage(uri, dbName);
  
  // data source of our tasks
  let tasks = [];
  try {
    console.log(data);
    data.tasks ? (tasks = data.tasks) : (tasks = tasks);
    //  connect to database
    await dbStorage.connect();
    // load all data from file to database
    await dbStorage.loadData(tasks);
    // query all data from database
    tasks = await dbStorage.readAllData();
    //  render on the homepage
    res.render("index", { tasks });
  } catch (error) {
    debug(error);
  } finally {
    // await dbStorage.disconnect();
    res.render("index", { tasks });
  }
  res.render("index", { tasks });
  // return tasks
});

export default indexRouter;
