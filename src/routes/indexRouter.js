import express from "express";
import debug from "debug"; ("app:indexRouter");

const indexRouter = express.Router();

// import json file
import data from "../data/tasks.json" assert {type: 'json'};


//routing index router to serve home page
indexRouter.route("/all").get(async (req, res) => {
  // data source of our tasks
  let tasks = [];
  try {  
    console.log(data);
    data.tasks ? tasks = data.tasks : tasks = tasks;
    res.render("index", { tasks });
    
  } catch (error) {
    debug(error)
    
  } finally {
    res.render("index", { tasks });
  }
  res.render("index", { tasks });

});

export default indexRouter;
