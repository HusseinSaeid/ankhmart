import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Category } from "@/payload-types";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.find({
      collection: "categories",
      depth: 1,
      pagination: false,
      where: { parent: { exists: false } },
      sort: "order",
    });
    const formattedData = data.docs.map((doc) => ({
      ...doc,
      subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
        ...(doc as Category),
        subcategories: undefined,
      })),
    }));

    const sortedData = formattedData.sort((a, b) => {
      if (a.slug === "all") return -1;
      if (b.slug === "all") return 1;
      return 0;
    });
    return sortedData;
  }),
});
