import { NextFunction, Request, Response } from "express";
import * as validator from "express-validator";
import { body, validationResult } from "express-validator";

import logger from "../../../../core/logger";

const middlewares = [
  // Validation middleware using express-validator for slotId
  body("startTime")
    .exists()
    .withMessage("startTime is required")
    .isISO8601()
    .withMessage("startTime must be a valid formatDate"),

  body("endTime")
    .exists()
    .withMessage("endTime is required")
    .isISO8601()
    .withMessage("endTime must be a valid formatDate"),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`Validating slotId parameter: ${req.params.slotId}`);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.debug(
        `Invalid slotId parameter provided ${JSON.stringify(errors.array())}`
      );
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    // If needed, you can perform additional validations or modifications here

    next();
  },
];

const validateSlotData = middlewares;
export default validateSlotData;
