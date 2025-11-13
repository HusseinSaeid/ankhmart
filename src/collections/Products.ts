import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  access: {
    create: ({ req }) => {
      if (isSuperAdmin(req.user)) return true;
      const tenant = req.user?.tenants?.[0]?.tenant as Tenant;
      return Boolean(tenant?.stripeDetailsSubmitted);
    },
  },
  admin: {
    useAsTitle: "name",
    description: "You Must verify your account before creating products",
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    { name: "description", type: "text" },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
      index: true,
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },

    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    { name: "image", type: "upload", relationTo: "media", required: true },
    { name: "download", type: "upload", relationTo: "download" },
    {
      name: "content",
      type: "textarea",
      admin: {
        description: "Proteced Content only Visable after Purchase",
      },
    },
  ],
};
