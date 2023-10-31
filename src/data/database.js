/*
This is the file that handles Mongo DB crud operations
1. Read data
2. Create data
3. Update data
4. Delete data
*/
import { MongoClient } from "mongodb";

class DBStorage {
  constructor(uri, dbName) {
    this.uri = uri;
    this.dbName = dbName;
    this.client = new MongoClient(uri);
  }

  async connect() {
    try {
      await this.client.connect();
      console.log("Connected to MongoDB");
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.error(error);
    }
  }
  async disconnect() {
    try {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error(error);
    }
  }

  async loadData(data) {
    try {
      const collection = this.db.collection("tasks");
      const results = await collection.insertMany(data);
      console.log(`Added ${results.insertedCount} to the collection`);
      results.insertedIds? addedItemsCount = results.insertedCount : addedItemsCount = 0;
      return addedItemsCount;
    } catch (error) {
      console.error(error);
    }
  }

  async readAllData (collectionName) {
    try {
        const collection = this.db.collection(collectionName);
        const results = await collection.find().toArray();
        console.log(`Found ${results.length} in the ${collectionName} collection`);
        return results;
      } catch (error) {
        console.error(error);
      }
  }

  async addNewData(collectionName, data) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.insertOne(data);
      console.log(`Added ${result.insertedCount} to the ${collectionName} collection`);
      return result.insertedId;
    } catch (error) {
      console.error(error);
    }
  }

  async updateData(collectionName, query, data) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.updateOne(query, { $set: data });
      console.log(`Updated ${result.modifiedCount} in the ${collectionName} collection`);
      return result.modifiedCount;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteData(collectionName, query, data) {
    try {
      const collection = this.db.collection(collectionName);
      const result = await collection.deleteOne(query);
      console.log(`Deleted ${result.deletedCount} from the ${collectionName} collection`);
      return result.deletedCount;
    } catch (error) {
      console.error(error);
    }
  }
}

export default DBStorage;