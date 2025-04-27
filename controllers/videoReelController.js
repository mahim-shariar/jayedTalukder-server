const VideoReel = require("../models/VideoReel");

exports.getAllVideoReels = async (req, res, next) => {
  try {
    // 1) Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // 2) Advanced filtering for category
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = VideoReel.find(JSON.parse(queryStr)).populate(
      "user",
      "name email"
    );

    // 3) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt"); // default: newest first
    }

    // Execute query
    const videoReels = await query;

    res.status(200).json({
      status: "success",
      results: videoReels.length,
      data: {
        videoReels,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.getVideoReel = async (req, res, next) => {
  try {
    const videoReel = await VideoReel.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!videoReel) {
      return res.status(404).json({
        status: "fail",
        message: "No video reel found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        videoReel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.createVideoReel = async (req, res, next) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, tags, category } =
      req.body;

    const newVideoReel = await VideoReel.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      tags,
      user: req.user.id, // assuming you're using authentication
      createdAt: Date.now(),
    });

    res.status(201).json({
      status: "success",
      data: {
        videoReel: newVideoReel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.updateVideoReel = async (req, res, next) => {
  try {
    const videoReel = await VideoReel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!videoReel) {
      return res.status(404).json({
        status: "fail",
        message: "No video reel found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        videoReel,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

exports.deleteVideoReel = async (req, res, next) => {
  try {
    const videoReel = await VideoReel.findByIdAndDelete(req.params.id);

    if (!videoReel) {
      return res.status(404).json({
        status: "fail",
        message: "No video reel found with that ID",
      });
    }

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
