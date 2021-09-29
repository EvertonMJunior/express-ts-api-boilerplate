import { IService, Service } from "../interfaces/Service";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import appController from "../server";

class CheckHealthService extends Service implements IService {
  public async handle(
    req: Request<ParamsDictionary, any, any, ParsedQs>,
    res: Response<any>
  ): Promise<Response<any>> {
    let result = await this.execute();
    if (result) {
      return res.status(200).send("OK");
    } else {
      return res.status(500).send("Error");
    }
  }

  public async execute(): Promise<boolean> {
    const dbHealth = appController.dbController.dbHealth;
    const health = dbHealth && appController.serverEnabled;
    return health;
  }
}

export default CheckHealthService;
