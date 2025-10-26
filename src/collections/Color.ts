import type { CollectionConfig } from "payload";

export const Color: CollectionConfig = {
  slug: "color",
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
