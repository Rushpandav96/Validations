const express = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.models");

const router = express.Router();

router.post( "/",

  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .bail()
    .withMessage("First Name cannot be empty")
    .isLength({ min: 4 })
    .withMessage("First Name must be at least 4 characters"),

  body("lastName").custom((value) => {
    if (value && value.length < 4) {
      throw new Error("Last Name if provided must be at least 4 characters");
    }
    return true;
  }),

  body("email")
    .isEmail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("Email is already taken");
      }
      return true;
    }),

  body("pincode")
  .not()
  .isEmpty()
  .withMessage("pincode is required")
  .isNumeric()
  .withMessage("Pncode must be 6 digit number")
  .custom((val) => {
    if (val < 1 || val > 1000000) {
    throw new Error("Incorrect pincode");
  }
    return true;
  }),

  body("age")
    .not()
    .isEmpty()
    .withMessage("Age cannot be empty")
    .isNumeric()
    .withMessage("Age must be a number between 1 and 100")
    .custom((val) => {
      if (val < 1 || val > 100) {
        throw new Error("Incorrect age provided");
      }
      return true;
    }),

    body("gender").bail().not().custom((value) => {
      if (value!=="Male" || value!=="Female" || value!=="Others") {
        throw new Error("Gender should be either Male, Female or Others");
      }
      return true;
    }),

  async (req, res) => {
    try {
      console.log(body("firstName"));
      const errors = validationResult(req);
      console.log({ errors });
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const user = await User.create(req.body);

      return res.status(201).send(user);
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  });

module.exports = router;
