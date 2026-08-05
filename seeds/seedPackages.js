const dotenv = require("dotenv");
const connectDB = require("../config/db");
const Package = require("../models/Package");

dotenv.config({ path: "./.env" });
connectDB();

const slugify = require("slugify");

const seed = async () => {
  try {
    // Do not delete existing packages to avoid removing real data in development
    const packages = [
      {
        name: "Starter",
        description: "Basic editing and color correction for short projects.",
        price: 49,
        currency: "USD",
        billingType: "one-time",
        features: ["Up to 2 minutes", "Color correction", "1 revision"],
        badge: "",
        isPopular: false,
        isFeatured: false,
        isActive: true,
        sortOrder: 10,
      },
      {
        name: "Professional",
        description: "Polished edits, motion graphics, and 4K delivery.",
        price: 199,
        currency: "USD",
        billingType: "one-time",
        features: ["Up to 10 minutes", "Motion graphics", "3 revisions", "4K delivery"],
        badge: "Popular",
        isPopular: true,
        isFeatured: true,
        isActive: true,
        sortOrder: 20,
      },
      {
        name: "Subscription Pro",
        description: "Monthly plan for creators with ongoing work.",
        price: 49,
        currency: "USD",
        billingType: "monthly",
        features: ["1 video/month", "Priority support", "Project storage"],
        badge: "Best Value",
        isPopular: true,
        isFeatured: false,
        isActive: true,
        sortOrder: 30,
      },
    ];

    // Upsert each package and compute slug
    for (const pkg of packages) {
      const slug = slugify(pkg.name || "", { lower: true, strict: true });
      await Package.findOneAndUpdate(
        { slug },
        { $set: { ...pkg, slug } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    }
    console.log("Seeded/updated packages successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
