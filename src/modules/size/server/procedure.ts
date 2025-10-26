import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

export const sizeRouter = createTRPCRouter({
  getMany: baseProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const data = await ctx.db.find({
        collection: "size",
        page: input.cursor,
        limit: input.limit,
      });
      return data;
    }),
});
