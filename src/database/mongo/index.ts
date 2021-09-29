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

  public closeConnection(): Promise<void> {
    if (this._dbConnection && this._dbConnection.connection) {
      return this._dbConnection.connection.close();
    } else {
      return Promise.resolve();
    }
  }

  public get dbHealth() {
    return (
      this._dbConnection &&
      this._dbConnection.connection &&
      this._dbConnection.connection.readyState === 1
    );
  }
}

export default MongoController;
