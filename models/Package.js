const mongoose = require("mongoose");
const slugify = require("slugify");

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Package name is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      default: "",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    billingType: {
      type: String,
      enum: ["one-time", "monthly", "yearly"],
      default: "one-time",
    },
    features: {
      type: [String],
      default: [],
    },
    badge: {
      type: String,
      default: "",
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

packageSchema.pre("save", function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = slugify(this.name || "", { lower: true, strict: true });
  }
  next();
});

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
