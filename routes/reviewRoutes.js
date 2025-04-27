const express = require("express");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router();

// Public routes
router.get("/", reviewController.getAllReviews);

// Protected routes
router.use(authController.protect);

router.post("/", reviewController.createReview);
router.patch("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
