import * as validator from "express-validator";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

/**
 * Validates the request body of the create hall endpoint.
 */
const validateCreateHallRequestMiddleware = [
  validator
    .body("hall.name.en")

    .exists()
    .withMessage("English name is required")

    .isString()
    .withMessage("English name must be a string"),

  validator
    .body("hall.name.ar")

    .exists()
    .withMessage("Arabic name is required")

    .isString()
    .withMessage("Arabic name must be a string"),

  validator
    .body("hall.capacity")

    .exists()
    .withMessage("Capacity is required")

    .isInt({ gt: 0 })
    .withMessage("Capacity must be a positive integer"),

  validateRequestMiddleware,
];

export default validateCreateHallRequestMiddleware;
