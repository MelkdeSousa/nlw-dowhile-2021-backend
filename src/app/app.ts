import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";

import authenticationRoutes from "../routes/Authentication";
import messageRoutes from "../routes/Message";
import userRoutes from "../routes/User";

import getRoutes from "../utils/getRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/", (req, res) => {
  const { path } = req;

  const routes = getRoutes(path, [
    authenticationRoutes,
    messageRoutes,
    userRoutes,
  ]);

  return res.json({ routes });
});

app.use("/api/", [authenticationRoutes, messageRoutes, userRoutes]);

export const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
