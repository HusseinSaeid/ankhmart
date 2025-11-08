import { Category, Media, Tenant, Color } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import z from "zod";
import { sortValues } from "../searchParams";
import { headers as getHeaders } from "next/headers";

export const productsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const headers = await getHeaders();
      const session = await ctx.db.auth({ headers });
      const product = await ctx.db.findByID({
        collection: "products",
        id: input.id,
        depth: 3,
      });
      let isPurchased = false;
      if (session.user) {
        const orderData = await ctx.db.find({
          collection: "orders",
          pagination: false,
          limit: 1,
          where: {
            and: [
              { product: { equals: input.id } },
              {
                user: { equals: session.user.id },
              },
            ],
          },
        });
        isPurchased = !!orderData.docs[0];
      }
      return {
        ...product,
        isPurchased,
        image: product.image as Media,
        tenant: {
          ...(typeof product.tenant === "object" && product.tenant !== null
            ? (product.tenant as Tenant)
            : {}),
          image:
            typeof product.tenant === "object" && product.tenant?.image
              ? (product.tenant.image as Media)
              : null,
          color:
            typeof product.tenant === "object" && product.tenant?.color
              ? (product.tenant.color as Color)
              : null,
        },
      };
    }),
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(),
        cursor: z.number().default(1),
        limit: z.number().default(10),
        minPrice: z.string().nullable().optional(),
        maxPrice: z.string().nullable().optional(),
        tags: z.array(z.string()).nullable().optional(),
        color: z.array(z.string()).nullable().optional(),
        size: z.array(z.string()).nullable().optional(),
        sort: z.enum(sortValues).nullable().optional(),
        tenantSlug: z.string().nullable().optional(),
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
        isPurchasedIds = ordersData.docs.map((o) => o.product as string);
      }
      const where: Where = {};

      let sort: Sort = "-name";
      switch (input.sort) {
        case "newest":
          sort = "-createdAt";
          break;
        case "oldest":
          sort = "createdAt";
          break;
        case "highest price":
          sort = "-price";
          break;
        case "lowest price":
          sort = "price";
          break;
        default:
          sort = "name";
      }
      if (input.minPrice || input.maxPrice) {
        where.price = {
          ...(input.minPrice && { greater_than_equal: input.minPrice }),
          ...(input.maxPrice && { less_than_equal: input.maxPrice }),
        };
      }
      if (input.tenantSlug) {
        where["tenant.slug"] = { equals: input.tenantSlug };
      }
      if (input.category) {
        const categoriesData = await ctx.db.find({
          collection: "categories",
          limit: 1,
          depth: 1,
          pagination: false,
          where: {
            slug: {
              equals: input.category,
            },
          },
        });
        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc,
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            subcategories: undefined,
          })),
        }));
        const mainCategory = formattedData[0];
        const subCategorySlugs: string[] = mainCategory
          ? mainCategory.subcategories.map((subcategory) => subcategory.slug)
          : [];
        where["category.slug"] = mainCategory
          ? { in: [mainCategory.slug, ...subCategorySlugs] }
          : { equals: input.category! };
      }
      if (input.tags && input.tags?.length > 0) {
        where["tags.name"] = {
          in: input.tags,
        };
      }
      if (input.color && input.color?.length > 0) {
        where["color.name"] = {
          in: input.color,
        };
      }
      if (input.size && input.size?.length > 0) {
        where["size.name"] = {
          in: input.size,
        };
      }

      const data = await ctx.db.find({
        collection: "products",
        depth: 2,
        where,
        sort,
        page: input.cursor,
        limit: input.limit,
      });

      return {
        ...data,
        docs: data.docs.map((doc) => ({
          ...doc,
          isPurchased: isPurchasedIds.includes(doc.id),
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & {
            image: Media | null;
          },
        })),
      };
    }),
});
