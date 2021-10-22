import { Request, Response } from "express";

import { GITHUB_CLIENT_ID } from "../config/environment";
import { Authentication as AuthenticationService } from "../services/Authentication";

export class Authentication {
  async login(req: Request, res: Response) {
    return res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
    );
  }

  async callback(req: Request, res: Response) {
    const { code } = req.query;

    return res.json({ code });
  }

  async authenticate(req: Request, res: Response) {
    const { code } = req.body;

    const data = await new AuthenticationService().execute(code);

    return res.json(data);
  }
}
