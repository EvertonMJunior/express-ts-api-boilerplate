import "dotenv/config";
import express, { Express } from "express";
import compression from "compression";
import responseTime from "response-time";
import helmet from "helmet";
import cors from "cors";

import { AuthRoutesController, UnauthRoutesController } from "./routes";
import errorMiddleware from "./middlewares/error.middleware";
import DbController from "./database";

class AppController {
  private _app: Express;
  private _dbController: DbController;

  constructor() {
    this._app = express();

    this.initializeDb();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();

    if (process.env.NODE_ENV === "production") {
      // Initialize production only requirements.
    }
  }

  private initializeDb() {
    this._dbController = new DbController();
  }

  private setupMiddlewares() {
    this._app.use(express.json({ limit: "2mb" }));
    this._app.use(compression());
    this._app.use(responseTime());
    this._app.use(helmet());
    this._app.use(cors());
  }

  private setupRoutes() {
    this._app.use("/v1", new UnauthRoutesController().routes);
    this._app.use("/v1", new AuthRoutesController().routes);
  }

  private setupErrorHandling() {
    this._app.use(errorMiddleware);
  }

  public get app() {
    return this._app;
  }

  public get dbController() {
    return this._dbController;
  }
}

export default AppController;
