// imageRoutes.js
const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const Image = require("./imageSchema");

router.get("/", async (req, res) => {
  try {
    const images = await Image.find({}, "-__v");
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const image = await Image.findOne({ imageData: req.params.id });

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const filePath = path.join(__dirname, "uploads", image.imageData);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: "Image file not found" });
    }

    res.sendFile(filePath);
  } catch (error) {
    console.error("Error fetching image:", error);
    res.status(500).json({ message: "Failed to fetch image" });
  }
});

module.exports = router;
