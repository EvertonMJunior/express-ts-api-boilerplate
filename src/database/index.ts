import MongoController from "./mongo";
import PostgresController from "./postgres";

class DbController {
  private _postgresController: PostgresController;
  private _mongoController: MongoController;

  constructor() {
    this.initializePostgres();
    this.initializeMongo();
  }

  private initializePostgres() {
    this._postgresController = new PostgresController();
  }

  private initializeMongo() {
    this._mongoController = new MongoController();
  }

  public get postgresController() {
    return this._postgresController;
  }

  public get mongoController() {
    return this._mongoController;
  }

  public get dbHealth() {
    return this._postgresController.dbHealth && this._mongoController.dbHealth;
  }

  public closeConnections() {
    let postgresClosePromise = this._postgresController.closeConnection();
    let mongoClosePromise = this._mongoController.closeConnection();
    return Promise.all([postgresClosePromise, mongoClosePromise]);
  }
}

export default DbController;
