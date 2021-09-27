import { Router } from "express";

import GetUsersService from "../services/users/GetUsers";

class UserController {
  private router: Router;

  constructor() {
    this.router = Router();

    this.getUsers();
  }

  public get routes(): Router {
    return this.router;
  }

  private getUsers() {
    this.router.get("/", new GetUsersService().handle);
  }
}

export default new UserController().routes;
