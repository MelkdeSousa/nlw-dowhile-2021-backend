import { io } from "../app/app";
import PrismaClient from "../prisma";

export class Message {
  async createMessage(text: string, user_id: string) {
    const message = await PrismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });

    const dataSocket = {
      text: message.text,
      user_id: message.user_id,
      created_at: message.created_at,
      user: {
        name: message.user.name,
        avatar_url: message.user.avatar_url,
      },
    };

    io.emit("new_message", dataSocket);

    return message;
  }

  async getLastMessages(last: number) {
    const lastMessages = await PrismaClient.message.findMany({
      take: last ? last : 3,
      include: { user: true },
      orderBy: { created_at: "desc" },
    });

    io.emit("last_messages", lastMessages);

    return lastMessages;
  }
}
