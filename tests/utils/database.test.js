/*
Test code for DBStorage class
*/
import { describe } from "mocha";
import { before, after } from "mocha";
import { expect } from "chai";

// import { describe, it } from "mocha";
import DBStorage from "../../src/utils/database.js";
import test_data from "../data/tasks.test.json" assert { type: "json" };

describe("DBStorage", () => {
  let dbStorage;

  before(async () => {
    dbStorage = new DBStorage("mongodb://localhost:27017", "test");
    await dbStorage.connect();
  });

  after(async () => {
    await dbStorage.deleteAllData();
    await dbStorage.disconnect();
  });

  describe("loadData from the database: loadData(tasks)", () => {
    it("should load all data from the collection", async () => {
      const tasks = test_data.tasks;
      const addedItemsCount = await dbStorage.loadData(tasks);
      expect(addedItemsCount).to.equal(2);
    });
  });

  describe("readAllData(): reads data from the database", () => {
    it("should read all data from the collection", async () => {
      const results = await dbStorage.readAllData();
      expect(results.length).to.equal(2);
    });
  });

  describe("getCompletedTasks(): get all completed tasks", () => {
    it("should return completed tasks from the collection", async () => {
      const results = await dbStorage.getCompletedTasks();
      expect(results.length).to.equal(1);
      expect(results.every((result) => result.completed)).to.equal(true);
    });
  });

  describe("getActiveTasks: get all uncompleted tasks", () => {
    it("should return uncompleted tasks from the collection", async () => {
      const results = await dbStorage.getActiveTasks();
      expect(results.every((item) => item.completed)).to.equal(false);
    });
  });

  describe("addNewData(data): add new task", () => {
    it("should add new data to the collection", async () => {
      const new_task = {
        _id: "DHl904b2sgAC",
        task: "Go out for shopping",
        completed: false,
      };
      const result = await dbStorage.addNewData(new_task);
      expect(result).to.equal("DHl904b2sgAC");
    });
  });
});
