const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController");
// const userModel = require("../models/userModel");

router.get("/", userController.getAll);
router.post(
  "/",
  [
    body("name").isLength({ min: 5 }).withMessage("min 5 karakter"),
    body("fullname").isLength({ min: 5 }).withMessage("min 5 karakter"),
    body("email").isEmail().withMessage("Email tidak valid")
    // body("email").isEmail().withMessage("Email tidak valid").custom(value => userController.cekExistingEmail(value))
  ],
  userController.create
);
router.get("/:id", userController.getById);
router.put("/:id", userController.update);
router.delete("/:id", userController.delete);

module.exports = router;
