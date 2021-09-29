import { Connection, createConnection } from "typeorm";

class PostgresController {
  private _dbConnection: Connection;

  constructor() {
    this.connectToDb();
  }

  private connectToDb() {
    createConnection()
      .then((connection) => {
        console.log("Connected to PostgreSQL.");
        this._dbConnection = connection;
      })
      .catch((error) => {
        console.error(`Error connecting to PostgreSQL: ${error}`);
      });
  }

  public get connection() {
    return this._dbConnection;
  }

  public closeConnection(): Promise<void> {
    if (this._dbConnection) {
      return this._dbConnection.close();
    } else {
      return Promise.resolve();
    }
  }

  public get dbHealth() {
    return this._dbConnection && this._dbConnection.isConnected;
  }
}

export default PostgresController;
