const express = require("express");
const packageController = require("../controllers/packageController");
const authController = require("../controllers/authController");

const router = express.Router();

// Public
router.get("/", packageController.getAllPackages);
router.get("/:slug", packageController.getPackage);

// Protected admin routes
router.use(authController.protect);
router.post("/", packageController.createPackage);
router.patch("/:slug", packageController.updatePackage);
router.delete("/:slug", packageController.deletePackage);

module.exports = router;
