import type { CollectionConfig } from "payload";

export const Size: CollectionConfig = {
  slug: "size",
  admin: { useAsTitle: "name" },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      unique: true,
    },
  ],
};
