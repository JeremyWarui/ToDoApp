/*
Class AppController: 
Main purpose is to render the homepage of the app
*/

import DBStorage from "../utils/database.js";
import debug from "debug";

// data source of our tasks
import data from "../data/tasks.json" assert { type: "json" };
const dbName = "todoapp";
const uri = `mongodb://127.0.0.1:27017`;
const dbStorage = new DBStorage(uri, dbName);

class AppController {
  static async getHomepage(_request, response) {
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
      response.status(200).render("index", { tasks });
    } catch (error) {
      debug(error);
    } finally {
      await dbStorage.disconnect();
    }
    const json = {
      allTasks: tasks,
    };
    console.log(json);
    // response.status(200).send("Hello, welcome to TodoApp!\n");
  }
}

export default AppController;
