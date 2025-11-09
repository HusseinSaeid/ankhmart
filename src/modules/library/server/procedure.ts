import { Download, Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { headers as getHeaders } from "next/headers";
import { TRPCError } from "@trpc/server";

export const libraryRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const ordersData = await ctx.db.find({
        collection: "orders",
        where: {
          and: [
            {
              product: { equals: input.productId },
            },
            {
              user: {
                equals: ctx.session.user.id,
              },
            },
          ],
        },
        limit: 1,
        pagination: false,
        depth: 2,
      });
      const order = ordersData.docs[0];
      if (!order) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Order Not Found",
        });
      }
      const product = await ctx.db.findByID({
        collection: "products",
        id: input.productId,
      });
      if (!product) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product Not Found",
        });
      }
      return {
        ...product,
        order,
        image: product.image as Media | null,
        tenant: product.tenant as Tenant & { image: Media | null },
        download: product.download as Download | null,
      };
    }),

  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(20),
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
          limit: 100,
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
