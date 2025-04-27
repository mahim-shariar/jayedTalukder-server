const mongoose = require("mongoose");

const videoReelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please enter a title"],
  },
  description: {
    type: String,
  },
  videoUrl: {
    type: String,
    required: [true, "Please provide a video URL"],
  },
  thumbnailUrl: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Please enter a category"],
    enum: [
      "wedding",
      "commercial",
      "travel",
      "shortfilm",
      "islamic",
      "podcast",
      "myFirstEdit",
      "bloopers",
      "behindTheScenes",
      "mySelfIntro",
    ],
  },
  tags: [String],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("VideoReel", videoReelSchema);
