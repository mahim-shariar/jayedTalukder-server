const Package = require("../models/Package");
const AppError = require("../utils/appError");

// Public: Get all packages (optionally only active)
exports.getAllPackages = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.isActive) filter.isActive = req.query.isActive === "true";
    const sortBy = req.query.sort || "sortOrder";
    const packages = await Package.find(filter).sort(sortBy);

    res.status(200).json({
      status: "success",
      results: packages.length,
      data: { packages },
    });
  } catch (err) {
    next(err);
  }
};

// Public: get single package by slug
exports.getPackage = async (req, res, next) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    if (!pkg) return next(new AppError("Package not found", 404));
    res.status(200).json({ status: "success", data: { package: pkg } });
  } catch (err) {
    next(err);
  }
};

// Admin: create package
exports.createPackage = async (req, res, next) => {
  try {
    const payload = req.body;
    const existing = await Package.findOne({ name: payload.name });
    if (existing) return next(new AppError("Package name already exists", 400));

    const pkg = await Package.create(payload);
    res.status(201).json({ status: "success", data: { package: pkg } });
  } catch (err) {
    next(err);
  }
};

// Admin: update package by slug
exports.updatePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findOne({ slug: req.params.slug });
    if (!pkg) return next(new AppError("Package not found", 404));

    Object.keys(req.body).forEach((key) => {
      pkg[key] = req.body[key];
    });

    await pkg.save();
    res.status(200).json({ status: "success", data: { package: pkg } });
  } catch (err) {
    next(err);
  }
};

// Admin: delete package by slug
exports.deletePackage = async (req, res, next) => {
  try {
    const pkg = await Package.findOneAndDelete({ slug: req.params.slug });
    if (!pkg) return next(new AppError("Package not found", 404));
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    next(err);
  }
};
