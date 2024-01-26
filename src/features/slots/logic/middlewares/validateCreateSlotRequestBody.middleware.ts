import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import logger from "../../../../core/logger";

export const createSlotValidator = [
  body("startTime")
    .exists()
    .isISO8601()
    .withMessage("Invalid startTime format"),
  body("endTime").exists().isISO8601().withMessage("Invalid endTime format"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating create slot req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.debug(
        `Invalid create slot req body provided ${JSON.stringify(
          errors.array()
        )}`
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
