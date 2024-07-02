import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import logger from "../../../../core/logger";

const middlewares = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("capacity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Capacity must be a positive integer"),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating update hall req body: ${JSON.stringify(req.body)}`
    );

    // if the request body contains any field other than "name" or "capacity", return an error
    const allowedFields = ["name", "capacity"];
    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
      logger.debug(
        `Invalid req body provided ${JSON.stringify(invalidFields)}`
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
        `Invalid req body provided ${JSON.stringify(errors.array())}`
      );
      return res.status(400).json({
        errors: [
          {
            message: errors.array()[0].msg,
          },
        ],
      });
    }

    if (req.body.name) req.body.name = req.body.name.trim();

    next();
  },
];

const updateHallValidator = middlewares;
export default updateHallValidator;
