import type { CollectionConfig } from "payload";

export const Download: CollectionConfig = {
  slug: "download",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
  ],
  upload: true,
};
