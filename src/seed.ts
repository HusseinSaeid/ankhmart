import { getPayload } from "payload";
import config from "@payload-config";

const categories = [
  { name: "All", slug: "all", order: 0 },
  {
    name: "Men's Fashion",
    color: "#6C63FF",
    slug: "mens-fashion",
    order: 1,
    subcategories: [
      { name: "T-Shirts", slug: "mens-t-shirts" },
      { name: "Shirts", slug: "mens-shirts" },
      { name: "Jeans & Pants", slug: "mens-jeans-pants" },
      { name: "Jackets & Coats", slug: "mens-jackets-coats" },
      { name: "Suits & Blazers", slug: "mens-suits-blazers" },
      { name: "Underwear", slug: "mens-underwear" },
      { name: "Shoes", slug: "mens-shoes" },
      { name: "Watches", slug: "mens-watches" },
      { name: "Accessories", slug: "mens-accessories" },
    ],
  },
  {
    name: "Women's Fashion",
    color: "#FF6B81",
    slug: "womens-fashion",
    order: 2,
    subcategories: [
      { name: "Dresses", slug: "womens-dresses" },
      { name: "Tops & Blouses", slug: "womens-tops-blouses" },
      { name: "Skirts", slug: "womens-skirts" },
      { name: "Pants & Jeans", slug: "womens-pants-jeans" },
      { name: "Outerwear", slug: "womens-outerwear" },
      { name: "Shoes & Heels", slug: "womens-shoes-heels" },
      { name: "Bags & Purses", slug: "womens-bags-purses" },
      { name: "Jewelry", slug: "womens-jewelry" },
      { name: "Watches", slug: "womens-watches" },
    ],
  },
  {
    name: "Kids",
    color: "#FFB347",
    slug: "kids",
    order: 3,
    subcategories: [
      { name: "Boys' Clothing", slug: "kids-boys-clothing" },
      { name: "Girls' Clothing", slug: "kids-girls-clothing" },
      { name: "Baby Wear", slug: "kids-baby-wear" },
      { name: "Kids' Shoes", slug: "kids-shoes" },
      { name: "Accessories", slug: "kids-accessories" },
    ],
  },
  {
    name: "Shoes",
    color: "#7EC8E3",
    slug: "shoes",
    order: 4,
    subcategories: [
      { name: "Casual Shoes", slug: "casual-shoes" },
      { name: "Sneakers", slug: "sneakers" },
      { name: "Formal Shoes", slug: "formal-shoes" },
      { name: "Boots", slug: "boots" },
      { name: "Sandals & Slippers", slug: "sandals-slippers" },
    ],
  },
  {
    name: "Accessories",
    color: "#FFD700",
    slug: "accessories",
    order: 5,
    subcategories: [
      { name: "Bags & Backpacks", slug: "accessories-bags-backpacks" },
      { name: "Watches", slug: "accessories-watches" },
      { name: "Sunglasses", slug: "accessories-sunglasses" },
      { name: "Belts", slug: "accessories-belts" },
      { name: "Hats & Caps", slug: "accessories-hats-caps" },
    ],
  },
  {
    name: "Jewelry & Watches",
    color: "#D8B5FF",
    slug: "jewelry-watches",
    order: 6,
    subcategories: [
      { name: "Bracelets", slug: "jewelry-bracelets" },
      { name: "Necklaces", slug: "jewelry-necklaces" },
      { name: "Earrings", slug: "jewelry-earrings" },
      { name: "Luxury Watches", slug: "jewelry-luxury-watches" },
      { name: "Smartwatches", slug: "jewelry-smartwatches" },
    ],
  },
  {
    name: "Bags & Wallets",
    color: "#FF9AA2",
    slug: "bags-wallets",
    order: 7,
    subcategories: [
      { name: "Handbags", slug: "bags-handbags" },
      { name: "Crossbody Bags", slug: "bags-crossbody" },
      { name: "Travel Bags", slug: "bags-travel" },
      { name: "Wallets", slug: "bags-wallets-wallets" },
      { name: "Clutches", slug: "bags-clutches" },
    ],
  },
  {
    name: "Sportswear",
    color: "#96E6B3",
    slug: "sportswear",
    order: 8,
    subcategories: [
      { name: "Activewear", slug: "sports-activewear" },
      { name: "Running Shoes", slug: "sports-running-shoes" },
      { name: "Gym Clothing", slug: "sports-gym-clothing" },
      { name: "Tracksuits", slug: "sports-tracksuits" },
    ],
  },
  {
    name: "Seasonal Collections",
    color: "#B5B9FF",
    slug: "seasonal-collections",
    order: 9,
    subcategories: [
      { name: "Winter Collection", slug: "seasonal-winter" },
      { name: "Summer Collection", slug: "seasonal-summer" },
      { name: "Autumn Collection", slug: "seasonal-autumn" },
      { name: "Spring Collection", slug: "seasonal-spring" },
    ],
  },
  {
    name: "Luxury",
    color: "#FFCAB0",
    slug: "luxury",
    order: 10,
    subcategories: [
      { name: "Designer Clothes", slug: "luxury-designer-clothes" },
      { name: "Luxury Shoes", slug: "luxury-shoes" },
      { name: "Premium Bags", slug: "luxury-premium-bags" },
      { name: "Gold Jewelry", slug: "luxury-gold-jewelry" },
      { name: "Luxury Watches", slug: "luxury-watches" },
    ],
  },
  {
    name: "Sales & Offers",
    color: "#FF6B6B",
    slug: "sales-offers",
    order: 11,
    subcategories: [
      { name: "Clearance", slug: "sales-clearance" },
      { name: "Flash Sale", slug: "sales-flash" },
      { name: "Buy 1 Get 1", slug: "sales-bogo" },
      { name: "Discount Codes", slug: "sales-discount" },
      { name: "Limited Edition", slug: "sales-limited" },
    ],
  },
  {
    name: "Other",
    slug: "other",
    order: 12,
  },
];

const seed = async () => {
  const payload = await getPayload({ config });
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
    for (const subcategory of category.subcategories || [])
      await payload.create({
        collection: "categories",
        data: {
          name: subcategory.name,
          slug: subcategory.slug,
          parent: parentCategory.id,
        },
      });
  }
};
await seed();
process.exit(0);
