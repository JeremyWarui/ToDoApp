/*
Class TasksController: 
Main purpose is to carry out all functionality of the REST API.
The methods in the class, carry out specific functionality in line
with their names
*/
import DBStorage from "../utils/database.js";
import fs from "fs";
import { nanoid } from "nanoid";
import debug from "debug";

// data source of our tasks
import data from "../data/tasks.json" assert { type: "json" };
const dbName = "todoapp";
const uri = `mongodb://127.0.0.1:27017`;
const dbStorage = new DBStorage(uri, dbName);

class TasksController {
  static async getAllTasks(_request, response) {
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
      //   res.render("index", { tasks });
    } catch (error) {
      debug(error);
    } finally {
      await dbStorage.disconnect();
    }
    const json = {
      allTasks: tasks,
    };
    console.log(json);
    // response.status(200).send(json);
    response.render('index', { tasks });
  }

  static async getCompletedTasks(_request, response) {
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
      //   res.render("index", { tasks });
    }
    const json = {
      completed: tasks,
    };
    console.log(json);
    // response.status(200).send(json);
    response.render('index', { tasks });
  }

  static async getActiveTasks(_request, response) {
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
    }
    const json = {
      tasks: tasks,
    };
    console.log(json);
    response.status(200).render('index', { tasks });
  }

  static async addNewTask(request, response) {
    const newItem = request.body.task;
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
    } finally {
      await dbStorage.disconnect();
      const json = {
        task: newtask.task,
      };
      console.log(json);
      //   res.json({ task: newtask.task });
      
    }
    response.status(200).json({task: newtask.task});
  }


  static async updateTask(request, response) {
    const itemId = request.params.id;
    console.log(data.tasks);
    console.log(request.body);
    let itemToUpdate = request.body;
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
    const json = {
      task: data.tasks,
    };
    console.log(json);
    response.status(200).send(json);
  }

  static async deleteTask(request, response) {
    const itemId = request.params.id;
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
      let deletedItem = await dbStorage.deleteData({ _id: itemId });
      // disconnect db

      console.log(deletedItem);
    } catch (error) {
      console.log(error);
    }
    await dbStorage.disconnect();
    const json = {
      task: foundTask,
    };
    response.status(200).send(json);
  }

}

export default TasksController;
