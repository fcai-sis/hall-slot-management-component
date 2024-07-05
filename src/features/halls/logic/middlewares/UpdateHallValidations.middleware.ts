import { body } from "express-validator";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

const middlewares = [
  body("name").optional().isObject().withMessage("Name must be an object"),
  body("name.en").optional().isString().withMessage("Name must be a string"),
  body("name.ar").optional().isString().withMessage("Name must be a string"),
  body("capacity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Capacity must be a positive integer"),

  validateRequestMiddleware,
];

const updateHallValidator = middlewares;
export default updateHallValidator;
