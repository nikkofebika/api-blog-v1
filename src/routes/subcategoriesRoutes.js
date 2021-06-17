const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategoryController");

router.get('/', subcategoryController.getAll);
module.exports = router;