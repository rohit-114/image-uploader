const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: "https://image-uploader-beta.vercel.app",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
    cb(null, true);
  } else {
    return cb(new Error("Please upload image of format jpg, jpeg"), false);
  }
};

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: multerFilter,
});

app.get("/", (req, res) => {
  res.send("Hello from image uploader backend");
});

app.post(
  "/single",
  upload.single("image"),
  async (req, res) => {
    console.log(req.file);
    try {
      const result = await cloudinary.uploader.upload(req.file.path);
      res.send(result);
    } catch (err) {
      console.log("err", err);
      res.status(400).send({ msg: err.message });
    }
  },
  (err, req, res, next) => {
    res.status(400).send({ msg: err.message });
  }
);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
