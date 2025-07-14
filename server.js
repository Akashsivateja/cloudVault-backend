const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const authRoutes = require("./routes/authRoutes");
const recordRoutes = require("./routes/recordRoutes");
const fileRoutes = require("./routes/fileRoutes");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"));

app.use("/api/auth", authRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/files", fileRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("🚀 Server is running...");
});
