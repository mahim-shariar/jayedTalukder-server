const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/forgotPassword", authController.forgotPassword);

// Protect all routes after this middleware
router.use(authController.protect);

// Protected routes
router.get("/me", authController.getCurrentUser);
router.patch("/updatePassword", authController.updatePassword);

module.exports = router;
