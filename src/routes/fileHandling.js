const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, __dirname + "./../uploads");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// Set saved storage options:
const upload = multer({ storage: storage });

router.get("/", (req, res) => {
  const getFiles = fs.readdirSync(__dirname + "/../uploads");
  if (getFiles.length > 0) {
    const filesData = getFiles
      .map((file) => {
        const filePath = path.join(__dirname + "/../uploads/" + file);
        return {
          file: file,
          modified: fs.statSync(filePath).birthtimeMs,
          filePath: path.join(__dirname + "/../uploads/" + file),
        };
      })
      .sort();

    res.status(200).json(filesData);
  } else {
    res.status(200).json({ message: "No file exist" });
  }
});

router.post("/upload", upload.array("files"), (req, res) => {
  res.json({ message: "File uploaded successfully!" });
});

router.get("/recent", (req, res) => {
  const getFiles = fs.readdirSync(__dirname + "/../uploads");
  if (getFiles.length > 0) {
    const filesData = getFiles
      .map((file) => {
        const filePath = path.join(__dirname + "/../uploads/" + file);
        return {
          file: file,
          modified: fs.statSync(filePath).birthtimeMs,
          filePath: path.join(__dirname + "/../uploads/" + file),
        };
      })
      .sort();

    res.status(200).json(filesData[0]);
  } else {
    res.status(200).json({ message: "No file exist" });
  }
});

router.post("/delete", async (req, res) => {
  const getFiles = fs.readdirSync(__dirname + "/../uploads");
  const fileName = req.body.file_name;

  if (getFiles.includes(fileName)) {
    fs.unlink(path.join(__dirname + "/../uploads/" + fileName), (err) => {
      if (err) {
        res
          .status(500)
          .send({ message: "Something went wrong. Cannot be deleted" });
      } else {
        res.status(200).json({ message: "Delete successfully" });
      }
    });
  } else {
    res.status(200).json({ message: "File does not exist" });
  }
});

module.exports = router;
