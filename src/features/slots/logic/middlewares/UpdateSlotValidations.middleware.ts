import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import logger from "../../../../core/logger";

const middlewares = [
  body("startTime")
    .optional()
    .isISO8601()
    .withMessage("Invalid startTime format"),
  body("endTime").optional().isISO8601().withMessage("Invalid endTime format"),
  body("day").optional().isString().withMessage("Day must be a string"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating update slot req body: ${JSON.stringify(req.body)}`
    );

    // if the request body contains any field other than "startTime", "endTime", or "day", return an error
    const allowedFields = ["startTime", "endTime", "day"];
    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
      logger.debug(
        `Invalid update slot req body provided ${JSON.stringify(invalidFields)}`
      );
      return res.status(400).json({
        error: {
          message: `Invalid fields provided: ${invalidFields}`,
        },
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.debug(
        `Invalid update slot req body provided ${JSON.stringify(
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

const updateSlotValidator = middlewares;
export default updateSlotValidator;
