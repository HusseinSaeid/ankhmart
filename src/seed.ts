import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  {
    name: "Design Assets",
    color: "#6C63FF",
    slug: "design-assets",
    order: 1,
    subcategories: [
      { name: "UI Kits", slug: "ui-kits" },
      { name: "Icons", slug: "icons" },
      { name: "Illustrations", slug: "illustrations" },
      { name: "3D Assets", slug: "3d-assets" },
      { name: "Mockups", slug: "mockups" },
    ],
  },
  {
    name: "Courses & Tutorials",
    color: "#FF6B81",
    slug: "courses-tutorials",
    order: 2,
    subcategories: [
      { name: "Web Development", slug: "web-development" },
      { name: "Design", slug: "design" },
      { name: "Marketing", slug: "marketing" },
      { name: "Productivity", slug: "productivity" },
    ],
  },
  {
    name: "eBooks",
    color: "#FFB347",
    slug: "ebooks",
    order: 3,
    subcategories: [
      { name: "Programming", slug: "ebooks-programming" },
      { name: "Design", slug: "ebooks-design" },
      { name: "Self-Improvement", slug: "ebooks-self-improvement" },
      { name: "Business", slug: "ebooks-business" },
    ],
  },
  {
    name: "Software & Tools",
    color: "#7EC8E3",
    slug: "software-tools",
    order: 4,
    subcategories: [
      { name: "Web Apps", slug: "web-apps" },
      { name: "Plugins", slug: "plugins" },
      { name: "Code Snippets", slug: "code-snippets" },
      { name: "APIs", slug: "apis" },
    ],
  },
  {
    name: "Music & Audio",
    color: "#FFD700",
    slug: "music-audio",
    order: 5,
    subcategories: [
      { name: "Beats", slug: "beats" },
      { name: "Sound Effects", slug: "sound-effects" },
      { name: "Loops & Samples", slug: "loops-samples" },
      { name: "Voice Packs", slug: "voice-packs" },
    ],
  },
  {
    name: "Photography",
    color: "#D8B5FF",
    slug: "photography",
    order: 6,
    subcategories: [
      { name: "Stock Photos", slug: "stock-photos" },
      { name: "Lightroom Presets", slug: "lightroom-presets" },
      { name: "Photo Packs", slug: "photo-packs" },
    ],
  },
  {
    name: "Templates",
    color: "#FF9AA2",
    slug: "templates",
    order: 7,
    subcategories: [
      { name: "Web Templates", slug: "web-templates" },
      { name: "Presentation Templates", slug: "presentation-templates" },
      { name: "Resume Templates", slug: "resume-templates" },
      { name: "Email Templates", slug: "email-templates" },
    ],
  },
  {
    name: "Fonts",
    color: "#96E6B3",
    slug: "fonts",
    order: 8,
    subcategories: [
      { name: "Display Fonts", slug: "display-fonts" },
      { name: "Sans Serif", slug: "sans-serif" },
      { name: "Script Fonts", slug: "script-fonts" },
    ],
  },
  {
    name: "3D & Motion",
    color: "#B5B9FF",
    slug: "3d-motion",
    order: 9,
    subcategories: [
      { name: "3D Models", slug: "3d-models" },
      { name: "Animations", slug: "animations" },
      { name: "Motion Templates", slug: "motion-templates" },
    ],
  },
  {
    name: "Bundles & Offers",
    color: "#FF6B6B",
    slug: "bundles-offers",
    order: 10,
    subcategories: [
      { name: "Discounted Bundles", slug: "discounted-bundles" },
      { name: "Limited Edition", slug: "limited-edition" },
      { name: "Freebies", slug: "freebies" },
    ],
  },
  {
    name: "Other",
    slug: "other",
    order: 11,
  },
];

const seed = async () => {
  const payload = await getPayload({ config });

  const adminTenant = await payload.create({
    collection: "tenants",
    data: {
      name: "ankh",
      slug: "ankh",
      stripeAccountId: "ankh",
    },
  });
  await payload.create({
    collection: "users",
    data: {
      email: "ankh@demo.com",
      password: "0000",
      roles: ["super-admin"],
      username: "superadmin",
      tenants: [
        {
          tenant: adminTenant.id,
        },
      ],
    },
  });

  for (const category of categories) {
    const parentCategory = await payload.create({
      collection: "categories",
      data: {
        name: category.name,
        slug: category.slug,
        color: category.color,
        parent: null,
        order: category.order ?? 0,
      },
    });

    for (const subcategory of category.subcategories || []) {
      await payload.create({
        collection: "categories",
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          parent: parentCategory.id,
        },
      });
    }
  }
};

await seed();
process.exit(0);
