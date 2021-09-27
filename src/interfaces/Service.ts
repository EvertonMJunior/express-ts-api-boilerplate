import autoBind from "auto-bind";
import { NextFunction, Request, Response } from "express";

interface IService {
  handle(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any> | void>;
  execute(...args: any[]): Promise<any>;
}

class Service {
  constructor() {
    autoBind(this);
  }
}

export { Service, IService };
