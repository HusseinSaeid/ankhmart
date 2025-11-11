import { isSuperAdmin } from "@/lib/access";
import type { CollectionConfig } from "payload";

export const Color: CollectionConfig = {
  slug: "color",
  access: {
    create: ({ req }) => isSuperAdmin(req.user),
    delete: ({ req }) => isSuperAdmin(req.user),
  },
  admin: { useAsTitle: "name", hidden: ({ user }) => !isSuperAdmin(user) },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};
