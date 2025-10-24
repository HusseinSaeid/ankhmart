import type { CollectionConfig } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
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
    },
    { name: "size", type: "text", hasMany: true },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: false,
    },
    { name: "image", type: "upload", relationTo: "media", required: true },
  ],
};
