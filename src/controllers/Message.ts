import { Request, Response } from "express";

import { Message as MessageService } from "../services/Message";

export class Message {
  async create(req: Request, res: Response) {
    const { text } = req.body;
    const { user_id } = req;

    const message = await new MessageService().createMessage(text, user_id);

    return res.status(201).json(message);
  }

  async message(req: Request, res: Response) {
    const { last } = req.query;

    const lastMessages = await new MessageService().getLastMessages(
      Number(last)
    );

    return res.json(lastMessages);
  }
}
