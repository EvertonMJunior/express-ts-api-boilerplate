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
}

export default DbController;
