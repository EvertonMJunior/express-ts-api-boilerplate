import { Router } from "express";
import CheckHealthService from "../services/CheckHealth";

import usersRoutes from "./users.routes";

class AuthRoutesController {
  private router: Router;

  constructor() {
    this.router = Router();

    this.setupMiddlewares();
    this.setupRoutes();
  }

  private setupMiddlewares() {
    // this.router.use(authenticator());
  }

  private setupRoutes() {
    this.router.use("/users", usersRoutes);
  }

  public get routes(): Router {
    return this.router;
  }
}

class UnauthRoutesController {
  private router: Router;

  constructor() {
    this.router = Router();

    this.setupRoutes();
  }

  private setupRoutes() {
    this.router.use("/health", new CheckHealthService().handle);
  }

  public get routes(): Router {
    return this.router;
  }
}

export { AuthRoutesController, UnauthRoutesController };
