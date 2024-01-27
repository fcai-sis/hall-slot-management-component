import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";

import logger from "../../../../core/logger";

/**
 * Validates the request body of the create hall endpoint.
 */
const middlewares = [
  validator
    .body("name")
    .exists()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),

  validator
    .body("capacity")
    .exists()
    .withMessage("Capacity is required")
    .isInt({ gt: 0 })
    .withMessage("Capacity must be a positive integer"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating create hall req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for create hall req body: ${JSON.stringify(
          req.body
        )}`
      );

      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    // Trim the validated data in the request body
    req.body.name = req.body.name.trim();

    next();
  },
];

const validateCreateHall = middlewares;
export default validateCreateHall;
