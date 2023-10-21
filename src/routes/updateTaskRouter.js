/*
 * Purpose: handles update requests
 * 1. get the striked/marked item
 * 2. find the item in the data base
 * 3. update the item property i.e done = true/false
 * 4. redirect the route to home route
 */

import express from "express";
import debug from "debug"; ("app:updateTaskRouter");
import fs from "fs";

//set the route to the express router function
const updateTaskRouter = express.Router();

// data source of our tasks
import data from "../data/tasks.json" assert {type: 'json'};

//routing index router to serve home page
updateTaskRouter.route("/")
.put(async (req, res) => {
    
  console.log(req.body);
//   // add the new item
//   let newtask = {
//     task: newItem,
//     done: false,
//   };
//   //add new item in the data array
//   data.tasks.push(newtask);

//   //write new item in the data file
//   fs.writeFileSync("src/data/tasks.json", JSON.stringify(data));

//   console.log(`Added "${newtask["task"]}" successfully`);
  res.redirect("/");
});

export default updateTaskRouter ;
