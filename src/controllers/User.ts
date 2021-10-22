import { Request, Response } from "express";

import { User as UserService } from "../services/User";

export class User {
  async profile(req: Request, res: Response) {
    const { user_id } = req;

    const user = await new UserService().profile(user_id);

    return res.json(user);
  }
}
