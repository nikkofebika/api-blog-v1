const bodyParser = require("body-parser");
const express = require("express");
const multer = require("multer");
const path = require("path");
require("dotenv").config();
const app = express();
const port = process.env.PORT;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.get("/", (req, res, next) => {
  res.send("ANJAYYYY");
});

const usersRoutes = require("./src/routes/usersRoute");
const articlesRoutes = require("./src/routes/articlesRoutes");
const categoriesRoutes = require("./src/routes/categoriesRoutes");
const subcategoriesRoutes = require("./src/routes/subcategoriesRoutes");
app.use("/v1/users", usersRoutes);
app.use("/v1/articles", articlesRoutes);
app.use("/v1/categories", categoriesRoutes);
app.use("/v1/subcategories", subcategoriesRoutes);

app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message || "Ada yang error bro";
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
