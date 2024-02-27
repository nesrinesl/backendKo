const { check, validationResult } = require("express-validator");

exports.registerValidation = () => [
  check("name", "the field name should not be empty").notEmpty().escape(),
  check("lastName", "the field last Name should not be empty")
    .notEmpty()
    .escape(),
  check("email", "the field email should not be empty").notEmpty().escape(),
  check("email", "this is not a valid email ").isEmail().escape(),
  check("password", "the password should be at least 10 car ")
    .isLength({ min: 10 })
    .escape(),
];

exports.validator = (req, res, next) => {
  let errors = validationResult(req);
  errors.isEmpty() ? next() : res.status(400).send(errors.array());
};


