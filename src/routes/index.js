/*
This's the router file: 
Connects the functionality of the controllers
to the respective endpoints of the API
*/

import express from "express";
import AppController from "../controllers/AppController.js";
import TasksController from "../controllers/TasksController.js";

const router = express.Router();

router.get('/', AppController.getHomepage);
router.get('/all', TasksController.getAllTasks)
router.get('/completed', TasksController.getCompletedTasks);
router.get('/active', TasksController.getActiveTasks);
router.delete('/delete/:id', TasksController.deleteTask);
router.post('/add', TasksController.addNewTask);
router.put('/update/:id', TasksController.updateTask);

export default router;