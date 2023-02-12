const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const uploadFileRoute = require("./routes/uploadFile");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json());

// Connect to mongodb
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to Mongo"))
  .catch((err) => console.log(err));

// Upload images

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/upload", uploadFileRoute);

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
