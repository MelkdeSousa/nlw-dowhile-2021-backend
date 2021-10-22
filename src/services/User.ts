import PrismaClient from "../prisma";

export class User {
  async profile(user_id: string) {
    const user = await PrismaClient.user.findFirst({ where: { id: user_id } });

    return user;
  }
}
