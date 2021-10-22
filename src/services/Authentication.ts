import axios from "axios";

import PrismaClient from "../prisma";
import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  JWT_SECRET,
} from "../config/environment";
import { sign } from "jsonwebtoken";

export interface IAuthenticationService {
  execute: (code: string) => Promise<any>;
}

interface IAccessTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
}

interface IGithubUser {
  id: number;
  login: string;
  avatar_url: string;
  name: string;
}

export class Authentication implements IAuthenticationService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const {
      data: { access_token },
    } = await axios.post<IAccessTokenResponse>(url, null, {
      params: {
        client_id: GITHUB_CLIENT_ID,
        client_secret: GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        Accept: "application/json",
      },
    });

    const {
      data: { name, id: github_id, avatar_url, login },
    } = await axios.get<IGithubUser>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${access_token}`,
      },
    });

    let user = await PrismaClient.user.findFirst({
      where: {
        github_id,
      },
    });

    if (!user) {
      user = await PrismaClient.user.create({
        data: {
          avatar_url,
          github_id,
          login,
          name,
        },
      });
    }

    const token = sign(
      {
        user: {
          id: user.id,
          avatar_url: user.avatar_url,
          name: user.name,
        },
      },
      String(JWT_SECRET),
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return { token, user };
  }
}
