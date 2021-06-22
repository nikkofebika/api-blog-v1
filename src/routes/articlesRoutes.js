const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

router.get("/", articleController.getAll);
router.get("/get_by_seotitle/:seo_title", articleController.getBySeoTitle);

module.exports = router;
