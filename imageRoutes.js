const express = require("express");
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./config.env" });

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });
const imageRoutes = express.Router();

// Save image
imageRoutes.post("/images", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded");
  }
  res.json({ filename: req.file.filename }); // Return filename as ID
});

// Get image
imageRoutes.get("/images/:id", (req, res) => {
  const imagePath = path.join(__dirname, "public/uploads", req.params.id);
  if (fs.existsSync(imagePath)) {
    res.sendFile(imagePath);
  } else {
    res.status(404).send("Image not found");
  }
});

module.exports = imageRoutes;
