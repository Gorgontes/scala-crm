import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

// Mocked DB
interface Post {
  id: number;
  name: string;
}
const posts: Post[] = [
  {
    id: 1,
    name: "Hello World",
  },
];

export const postRouter = createTRPCRouter({
  getUsers: publicProcedure.query(async ({ ctx }) => {
    console.log("before query");
    const users = await ctx.db.query.users.findMany();
    console.log("after query");
    console.log("users", users);
    return users;
  })
});
