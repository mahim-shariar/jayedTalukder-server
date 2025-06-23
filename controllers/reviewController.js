const Review = require("../models/Review");
const cloudinary = require("../utils/cloudinary");

exports.getAllReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find().populate("user", "name");

    res.status(200).json({
      status: "success",
      results: reviews.length,
      data: {
        reviews,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const { content, rating, userName, screenshot, screenshotId } = req.body;

    const newReview = await Review.create({
      content,
      rating,
      user: req.user.id,
      userName,
      screenshot,
      screenshotId,
    });

    res.status(201).json({
      status: "success",
      data: {
        review: newReview,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateReview = async (req, res, next) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      return res.status(404).json({
        status: "fail",
        message: "No review found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        review,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        status: "fail",
        message: "No review found with that ID",
      });
    }

    // Delete screenshot from Cloudinary if screenshotId exists
    if (review.screenshotId) {
      await cloudinary.uploader.destroy(review.screenshotId);
    }

    await Review.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
