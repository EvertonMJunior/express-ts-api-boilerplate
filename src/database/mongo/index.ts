import { connect, Mongoose } from "mongoose";

class MongoController {
  private _dbConnection: Mongoose;

  constructor() {
    this.connectToDb();
  }

  private connectToDb() {
    connect(process.env.MONGO_URI as string)
      .then((connection) => {
        console.log("Connected to MongoDB.");
        this._dbConnection = connection;
      })
      .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error}`);
      });
  }

  public get connection() {
    return this._dbConnection;
  }
}

export default MongoController;
