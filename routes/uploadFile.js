const router = require("express").Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/home/mosherif/Downloads/Blog-Full-Stack/api/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), (req, res) => {
  res.status(200).json({ msg: "File has been uploaded successfully! " });
});

module.exports = router;
