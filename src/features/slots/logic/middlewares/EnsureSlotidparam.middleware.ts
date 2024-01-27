import { NextFunction, Request, Response } from "express";
import { param, validationResult } from "express-validator";

import logger from "../../../../core/logger";

const middlewares = [
  // Validation middleware using express-validator for slotId
  param("id")
    .exists()
    .withMessage("Slot ID is required")
    .isMongoId()
    .withMessage("Slot ID must be a valid Mongo ID"),

  // Middleware to handle validation errors
  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`Validating slotId parameter: ${req.params.id}`);

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

const ensureSlotIdInParamsMiddleware = middlewares;
export default ensureSlotIdInParamsMiddleware;
