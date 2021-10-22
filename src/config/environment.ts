import dotenv from "dotenv";
import { networkInterfaces } from "os";
dotenv.config();

const nets = networkInterfaces();
export const IP = nets["eth0"]?.[0]["address"];

export const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, PORT, JWT_SECRET } =
  process.env;
