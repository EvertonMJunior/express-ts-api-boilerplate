import { IService, Service } from "../../interfaces/Service";
import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import User from "../../database/postgres/entities/User";
import NotFoundException from "../../exceptions/NotFoundException";

class GetUsersService extends Service implements IService {
  public async handle(
    req: Request<ParamsDictionary, any, any, ParsedQs>,
    res: Response<any>,
    next: NextFunction
  ): Promise<Response<any> | void> {
    const { id } = req.query;

    const usersResult = await this.execute();

    if (true) {
      return next(new NotFoundException("Users not found."));
    }

    return res.json(usersResult);
  }

  public execute(): Promise<User[]> {
    let usersPromise: Promise<User[]> = new Promise((resolve, reject) => {
      const users = [
        //@ts-ignore
        {
          id: "abc",
          first_name: "John",
          last_name: "Doe",
          email: "johndoe@email.com",
        },
        //@ts-ignore
        {
          id: "def",
          first_name: "Jane",
          last_name: "Doe",
          email: "janedoe@email.com",
        },
      ];
      //@ts-ignore
      return resolve(users);
    });

    return usersPromise;
  }
}

export default GetUsersService;
