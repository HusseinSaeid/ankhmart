import { Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { headers as getHeaders } from "next/headers";

export const libraryRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders();
      const session = await ctx.db.auth({ headers });
      let isPurchasedIds: string[] = [];
      if (session.user) {
        const ordersData = await ctx.db.find({
          collection: "orders",
          where: {
            user: {
              equals: session.user.id,
            },
          },
          limit: 999,
          pagination: false,
          depth: 0,
        });
        isPurchasedIds = ordersData.docs.map(
          (order) => order.product as string
        );
      }

      const data = await ctx.db.find({
        collection: "orders",
        depth: 0,
        page: input.cursor,
        limit: input.limit,
        where: {
          user: {
            equals: ctx.session.user.id,
          },
        },
      });

      const productData = await ctx.db.find({
        collection: "products",
        pagination: false,
        where: {
          id: {
            in: isPurchasedIds,
          },
        },
      });
      return {
        ...data,
        docs: productData.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
          isPurchased: isPurchasedIds.includes(doc.id),
        })),
      };
    }),
});
