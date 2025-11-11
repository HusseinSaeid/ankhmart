import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    read: () => true,
    create: ({ req }) => isSuperAdmin(req.user),
    update: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: {
    useAsTitle: "slug",
    hidden: ({ user }) => !isSuperAdmin(user),
  },

  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    { name: "slug", type: "text", required: true, unique: true, index: true },
    { name: "color", type: "text" },
    {
      name: "parent",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      index: true,
      admin: { position: "sidebar" },
    },
    {
      name: "subcategories",
      type: "join",
      collection: "categories",
      on: "parent",
      hasMany: true,
    },
  ],
};
